const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "blob:"],
            mediaSrc: ["'self'", "blob:"],
        }
    },
    crossOriginEmbedderPolicy: false
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5 // limit auth attempts
});

app.use('/api/', apiLimiter);
app.use('/api/auth/', authLimiter);

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// File storage configuration
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const dir = file.fieldname === 'video' ? 'uploads/videos' : 'uploads/images';
        try {
            await fs.mkdir(dir, { recursive: true });
            cb(null, dir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB max file size
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'video') {
            const videoTypes = /mp4|avi|mkv|mov|webm/;
            const extname = videoTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = videoTypes.test(file.mimetype);
            
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Only video files are allowed!'));
            }
        } else if (file.fieldname === 'image') {
            const imageTypes = /jpeg|jpg|png|gif|webp/;
            const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = imageTypes.test(file.mimetype);
            
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Only image files are allowed!'));
            }
        }
        cb(null, true);
    }
});

// In-memory database (replace with real database in production)
let users = [];
let videos = [];
let comments = [];

// Load data from files
async function loadData() {
    try {
        const usersData = await fs.readFile('data/users.json', 'utf-8');
        users = JSON.parse(usersData);
    } catch (error) {
        users = [];
    }

    try {
        const videosData = await fs.readFile('data/videos.json', 'utf-8');
        videos = JSON.parse(videosData);
    } catch (error) {
        videos = [];
    }

    try {
        const commentsData = await fs.readFile('data/comments.json', 'utf-8');
        comments = JSON.parse(commentsData);
    } catch (error) {
        comments = [];
    }
}

// Save data to files
async function saveData() {
    try {
        await fs.mkdir('data', { recursive: true });
        await fs.writeFile('data/users.json', JSON.stringify(users, null, 2));
        await fs.writeFile('data/videos.json', JSON.stringify(videos, null, 2));
        await fs.writeFile('data/comments.json', JSON.stringify(comments, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// AUTH ROUTES

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        if (users.find(u => u.username === username)) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: crypto.randomUUID(),
            username: sanitizeInput(username),
            email: sanitizeInput(email),
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        await saveData();

        // Generate token
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// VIDEO ROUTES

// Get all videos
app.get('/api/videos', async (req, res) => {
    try {
        const videosWithUrls = videos.map(v => ({
            ...v,
            url: `/uploads/videos/${path.basename(v.filename)}`,
            thumbnail: v.thumbnail || '/uploads/videos/default-thumb.jpg'
        }));
        res.json({ videos: videosWithUrls });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single video
app.get('/api/videos/:id', async (req, res) => {
    try {
        const video = videos.find(v => v.id === req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const videoWithUrl = {
            ...video,
            url: `/uploads/videos/${path.basename(video.filename)}`,
            thumbnail: video.thumbnail || '/uploads/videos/default-thumb.jpg'
        };

        res.json({ video: videoWithUrl });
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload video
app.post('/api/videos/upload', authenticateToken, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const video = {
            id: crypto.randomUUID(),
            title: sanitizeInput(title),
            description: sanitizeInput(description || ''),
            filename: req.file.filename,
            userId: req.user.id,
            author: req.user.username,
            views: 0,
            createdAt: new Date().toISOString()
        };

        videos.push(video);
        await saveData();

        res.status(201).json({
            message: 'Video uploaded successfully',
            video: {
                ...video,
                url: `/uploads/videos/${video.filename}`
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Increment video views
app.post('/api/videos/:id/view', async (req, res) => {
    try {
        const video = videos.find(v => v.id === req.params.id);
        if (video) {
            video.views = (video.views || 0) + 1;
            await saveData();
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error incrementing views:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// COMMENT ROUTES

// Get comments for a video
app.get('/api/videos/:id/comments', async (req, res) => {
    try {
        const videoComments = comments.filter(c => c.videoId === req.params.id);
        
        const commentsWithUrls = videoComments.map(c => ({
            ...c,
            image: c.image ? `/uploads/images/${path.basename(c.image)}` : null
        }));

        res.json({ comments: commentsWithUrls });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Post a comment
app.post('/api/comments', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { videoId, text } = req.body;

        if (!videoId || !text) {
            return res.status(400).json({ message: 'Video ID and text are required' });
        }

        const comment = {
            id: crypto.randomUUID(),
            videoId: sanitizeInput(videoId),
            text: sanitizeInput(text),
            author: req.user.username,
            userId: req.user.id,
            image: req.file ? req.file.filename : null,
            date: new Date().toISOString()
        };

        comments.push(comment);
        await saveData();

        res.status(201).json({
            message: 'Comment posted successfully',
            comment: {
                ...comment,
                image: comment.image ? `/uploads/images/${comment.image}` : null
            }
        });
    } catch (error) {
        console.error('Comment error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// SHORT LINK ROUTE
app.get('/v/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Initialize and start server
async function startServer() {
    await loadData();
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════╗
║   TIPSY SERVER RUNNING ON PORT ${PORT}   ║
║   Cyberpunk Video Hub Initialized     ║
╚═══════════════════════════════════════╝
        `);
        console.log(`Local: http://localhost:${PORT}`);
    });
}

startServer();
