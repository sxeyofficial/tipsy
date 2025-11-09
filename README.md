# 🎬 TIPSY - Cyberpunk Video Sharing Platform

A full-featured video sharing platform with a stunning cyberpunk aesthetic, featuring neon themes, smooth animations, and comprehensive video management capabilities.

![Tipsy Banner](https://via.placeholder.com/1200x300/0a0a0f/ff006e?text=TIPSY+-+Cyberpunk+Video+Hub)

## ✨ Features

### 🎨 Visual Features
- **Cyberpunk Theme**: Neon pink/blue color scheme with glowing effects
- **Dark/Light Mode Toggle**: Seamless theme switching with smooth transitions
- **Animated Grid Background**: Dynamic cyberpunk-style grid animation
- **Smooth Animations**: Professional transitions and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎥 Video Features
- **Video Upload**: Easy drag-and-drop or file selection upload
- **Video Player**: Custom controls with advanced features
  - Skip 30 seconds forward/backward
  - Infinite loop toggle
  - Picture-in-Picture mode (Theater mode)
- **View Counter**: Automatic view tracking
- **Video Grid**: Beautiful card-based video display
- **Share System**: Generate short links for easy sharing

### 💬 Comment System
- **Text Comments**: Add comments to any video
- **Image Uploads**: Attach images to comments
- **Blurred Images**: Images are blurred by default and reveal on click (privacy feature)
- **Real-time Updates**: Comments appear immediately after posting

### 🔐 Security Features
- **User Authentication**: Email/password registration (no Google required)
- **JWT Tokens**: Secure session management
- **Password Hashing**: Bcrypt encryption for passwords
- **Rate Limiting**: Protection against brute force attacks
- **Input Sanitization**: XSS attack prevention
- **Helmet.js**: Security headers protection
- **File Validation**: Strict file type checking

### 🚀 Additional Features
- **Short Links**: Shareable `/v/{videoId}` format
- **Progress Bar**: Beautiful neon progress indicator for uploads
- **User Profiles**: Username display with neon styling
- **Error Handling**: User-friendly error messages

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

## 🛠️ Installation & Setup

### Step 1: Extract Files

Extract all files to a folder (e.g., `tipsy-platform`). Your folder structure should look like:

```
tipsy-platform/
├── index.html
├── styles.css
├── app.js
├── server.js
├── package.json
└── README.md
```

### Step 2: Install Dependencies

Open a terminal/command prompt in the project folder and run:

```bash
npm install
```

This will install all required packages:
- express (web server)
- cors (cross-origin requests)
- bcryptjs (password encryption)
- jsonwebtoken (authentication)
- multer (file uploads)
- helmet (security)
- express-rate-limit (rate limiting)

### Step 3: Create Required Folders

Create the following folder structure:

```bash
mkdir public
mkdir public/uploads
mkdir public/uploads/videos
mkdir public/uploads/images
mkdir data
```

Or on Windows Command Prompt:
```cmd
mkdir public\uploads\videos
mkdir public\uploads\images
mkdir data
```

### Step 4: Move Frontend Files

Move these files into the `public` folder:
- `index.html`
- `styles.css`
- `app.js`

Your structure should now be:
```
tipsy-platform/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── uploads/
│       ├── videos/
│       └── images/
├── data/
├── server.js
├── package.json
└── README.md
```

### Step 5: Start the Server

Run the server with:

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

You should see:
```
╔═══════════════════════════════════════╗
║   TIPSY SERVER RUNNING ON PORT 3000   ║
║   Cyberpunk Video Hub Initialized     ║
╚═══════════════════════════════════════╝
Local: http://localhost:3000
```

### Step 6: Access the Platform

Open your browser and navigate to:
```
http://localhost:3000
```

🎉 **You're ready to go!**

## 👥 Using the Platform

### For Users (Accessing the Site)

1. **Visit the Link**: Share your deployment URL or use `http://localhost:3000` locally
2. **Register**: Click "REGISTER" and create an account
3. **Upload Videos**: Click "UPLOAD" to share videos
4. **Watch & Comment**: Browse videos, watch, and leave comments
5. **Share**: Use the share button (🔗) to get a short link

### First-Time Setup

1. **Register an Account**:
   - Click "LOGIN" → "REGISTER" tab
   - Enter username, email, and password
   - Password must be at least 6 characters

2. **Upload Your First Video**:
   - Click "UPLOAD" button
   - Enter video title and description
   - Select a video file (MP4, AVI, MKV, MOV, or WebM)
   - Watch the neon progress bar!

3. **Comment on Videos**:
   - Click any video to open player
   - Scroll to comments section
   - Add text and/or an image
   - Images will be blurred until clicked

## 🌐 Deployment (Making it Public)

### Option 1: Deploy to Railway (Recommended - Easy)

1. **Sign up**: Go to [Railway.app](https://railway.app) and sign up
2. **Create New Project**: Click "New Project" → "Deploy from GitHub"
3. **Connect Repository**: Push your code to GitHub first
4. **Add Environment Variables**:
   ```
   PORT=3000
   JWT_SECRET=your-super-secret-key-here-change-this
   ```
5. **Deploy**: Railway will automatically detect and deploy your app
6. **Get URL**: Railway provides a public URL like `yourapp.railway.app`

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**: Download from [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)
2. **Login**: Run `heroku login`
3. **Create App**:
   ```bash
   heroku create tipsy-video-app
   ```
4. **Set Environment Variables**:
   ```bash
   heroku config:set JWT_SECRET=your-secret-key-here
   ```
5. **Deploy**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```
6. **Open**: `heroku open`

### Option 3: Deploy to Vercel (For Static + API)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Login**: Run `vercel login`
3. **Deploy**: Run `vercel`
4. **Follow Prompts**: Configure as Node.js app
5. **Get URL**: Vercel provides a URL like `your-app.vercel.app`

### Option 4: Deploy to DigitalOcean (Full Control)

1. **Create Droplet**: Ubuntu 22.04, $6/month plan
2. **SSH into Server**: `ssh root@your-ip`
3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
4. **Clone/Upload Code**: Use Git or SCP
5. **Install Dependencies**: `npm install`
6. **Install PM2**:
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```
7. **Setup Nginx** (reverse proxy):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/tipsy
   ```
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
8. **Enable Site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tipsy /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔒 Security Best Practices

### Before Deployment:

1. **Change JWT Secret**:
   ```javascript
   // In server.js, set a strong secret or use environment variable
   const JWT_SECRET = process.env.JWT_SECRET || 'your-very-long-random-secret-key';
   ```

2. **Use Environment Variables**:
   Create a `.env` file (don't commit this!):
   ```
   PORT=3000
   JWT_SECRET=your-secret-key-minimum-32-characters-long
   DATABASE_URL=your-database-url-if-using-real-db
   ```

3. **Install dotenv**:
   ```bash
   npm install dotenv
   ```
   
   Add to top of server.js:
   ```javascript
   require('dotenv').config();
   ```

4. **Update CORS** (in production):
   ```javascript
   app.use(cors({
       origin: 'https://yourdomain.com',
       credentials: true
   }));
   ```

5. **Use HTTPS**: Always use HTTPS in production
   - Railway/Vercel provide this automatically
   - For custom servers, use Let's Encrypt (free SSL)

## 💾 Database Migration (Optional but Recommended)

The current setup uses JSON files for storage. For production, migrate to a real database:

### MongoDB Setup:

1. **Install Mongoose**:
   ```bash
   npm install mongoose
   ```

2. **Create Models** (create `models` folder):
   
   `models/User.js`:
   ```javascript
   const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
       username: { type: String, required: true, unique: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       createdAt: { type: Date, default: Date.now }
   });

   module.exports = mongoose.model('User', userSchema);
   ```

3. **Connect to MongoDB** (in server.js):
   ```javascript
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tipsy');
   ```

4. **Use MongoDB Atlas** (free cloud database):
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get connection string
   - Add to environment variables

### PostgreSQL Setup (Alternative):

1. **Install pg**:
   ```bash
   npm install pg
   ```

2. **Use Services**:
   - Railway (has built-in PostgreSQL)
   - Heroku Postgres
   - ElephantSQL (free tier)

## 🎯 Testing the Platform

### Test Checklist:

- [ ] Register a new user
- [ ] Login with credentials
- [ ] Upload a video
- [ ] Watch a video
- [ ] Skip forward/backward 30 seconds
- [ ] Toggle loop mode
- [ ] Try theater/PiP mode
- [ ] Post a comment
- [ ] Upload image with comment
- [ ] Click blurred image to reveal
- [ ] Share a video (get short link)
- [ ] Access video via short link
- [ ] Toggle dark/light mode
- [ ] Test on mobile device
- [ ] Logout and login again

## 📱 Sharing Your Platform

Once deployed, users can access your platform by:

1. **Direct URL**: `https://your-domain.com`
2. **Short Links**: `https://your-domain.com/v/{videoId}`
3. **Share Button**: Click 🔗 on any video to get shareable link

## 🐛 Troubleshooting

### "Cannot find module" errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use:
Change port in server.js or:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Videos not uploading:
- Check upload folder permissions
- Verify file size limits (default 500MB)
- Check disk space

### CORS errors:
Update CORS configuration in server.js:
```javascript
app.use(cors({
    origin: '*', // Or specify your domain
    credentials: true
}));
```

## 🚀 Performance Optimization

### For Better Performance:

1. **Use CDN** for static files
2. **Compress Videos** before upload (HandBrake, FFmpeg)
3. **Implement Video Streaming** (HLS/DASH)
4. **Add Caching** (Redis)
5. **Use Cloud Storage** (AWS S3, Cloudflare R2)
6. **Enable Gzip Compression**:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

## 📊 Monitoring & Analytics

Add monitoring:

```bash
npm install morgan
```

In server.js:
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## 🎨 Customization

### Change Colors:

Edit `styles.css`:
```css
:root {
    --primary-neon: #your-color;
    --secondary-neon: #your-color;
    --tertiary-neon: #your-color;
}
```

### Modify Site Name:

Change "TIPSY" in:
- `index.html` (title and logo)
- `server.js` (ASCII banner)

## 📄 License

MIT License - Feel free to modify and use!

## 🆘 Support

If you encounter issues:

1. Check this README
2. Verify all dependencies are installed
3. Check browser console for errors
4. Check server logs
5. Ensure ports are not blocked

## 🎉 You're All Set!

Your cyberpunk video platform is ready! Users can now:
- Visit your site
- Register accounts
- Upload videos
- Watch and comment
- Share with friends

**Remember**: For production use, implement proper database, cloud storage for videos, and SSL certificates!

---

Made with 💜 and ⚡ in the cyberpunk future
