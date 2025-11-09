# 🚀 GETTING STARTED - TIPSY

## Welcome to Tipsy!

This guide will get you up and running in **5 minutes**.

---

## 📦 What You Have

You've received a complete, production-ready video sharing platform with:

✅ **Cyberpunk UI** - Neon colors, smooth animations, dark/light mode
✅ **Video Upload** - Users can upload and share videos
✅ **Comments** - Text + image comments (blurred images for privacy)
✅ **Authentication** - Secure user registration and login
✅ **Video Controls** - Skip 30s, loop, picture-in-picture
✅ **Share Links** - Short URLs for easy sharing
✅ **Security** - Rate limiting, JWT auth, input sanitization
✅ **Responsive** - Works on desktop, tablet, and mobile

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Node.js

**Don't have Node.js?** Download it here: [nodejs.org](https://nodejs.org)

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Run Setup

**Option A - Windows:**
Double-click `setup.bat`

**Option B - Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Option C - Manual:**
```bash
npm install
mkdir -p public/uploads/videos public/uploads/images data
mv index.html styles.css app.js public/
```

### Step 3: Start the Server

```bash
npm start
```

### Step 4: Open in Browser

Visit: **http://localhost:3000**

**That's it!** 🎉

---

## 📁 File Structure

```
tipsy/
├── 📄 index.html          # Main HTML file
├── 🎨 styles.css          # All the cyberpunk styling
├── ⚡ app.js              # Frontend JavaScript
├── 🖥️  server.js          # Backend server
├── 📦 package.json        # Dependencies
├── 📋 README.md           # Full documentation
├── 🚀 DEPLOYMENT.md       # How to deploy online
├── 🔒 SECURITY.md         # Security guide
├── 📡 API.md              # API documentation
├── ⚙️  setup.sh/.bat      # Automated setup scripts
├── 🗂️  public/            # Static files served to users
│   ├── uploads/          # Where uploaded files go
│   │   ├── videos/       # Video files
│   │   └── images/       # Comment images
└── 💾 data/              # JSON database files
```

---

## 🎮 First Time Using Tipsy

### 1. Register an Account
- Click "LOGIN" button
- Switch to "REGISTER" tab
- Create your account (username, email, password)

### 2. Upload Your First Video
- Click "UPLOAD" button
- Enter title and description
- Select a video file
- Watch the neon progress bar!

### 3. Watch Videos
- Click any video card to open the player
- Use the custom controls:
  - ⏪ Skip back 30 seconds
  - ⏩ Skip forward 30 seconds
  - 🔁 Toggle loop mode
  - 🎭 Picture-in-picture mode

### 4. Comment
- Scroll down in the video player
- Type your comment
- Optionally add an image (it'll be blurred until clicked)
- Click POST

### 5. Share
- Click the 🔗 button on any video
- Copy the short link
- Share with friends!

---

## 🌐 Making It Public

Running on your computer is great for testing, but to share with others:

### Easiest Options:

**1. Railway** (Recommended)
- Sign up at [railway.app](https://railway.app)
- Connect your GitHub repository
- Deploy with one click
- Get a public URL instantly

**2. Render**
- Sign up at [render.com](https://render.com)
- Connect repository
- Deploy as Web Service
- Free tier available

**3. Vercel**
- `npm install -g vercel`
- Run `vercel` in the project folder
- Follow prompts

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

---

## ⚙️ Configuration

### Change Port

Edit `server.js` or create `.env`:
```env
PORT=8080
```

### Secure Your Site

**IMPORTANT:** Before deploying, change the JWT secret!

Create `.env` file:
```env
JWT_SECRET=your-super-long-random-secret-key-here-make-it-strong
```

Or generate one:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Adjust File Size Limits

In `server.js`, find:
```javascript
limits: { fileSize: 500 * 1024 * 1024 } // 500MB
```

Change to whatever you need.

---

## 🎨 Customize the Look

### Change Colors

Edit `styles.css`:
```css
:root {
    --primary-neon: #ff006e;    /* Change this */
    --secondary-neon: #00f5ff;  /* And this */
    --tertiary-neon: #7b2cbf;   /* And this */
}
```

### Change Site Name

1. In `index.html`, find "TIPSY" and replace it
2. In `server.js`, update the ASCII banner

---

## 🐛 Troubleshooting

### "Port already in use"
Another app is using port 3000. Either:
- Stop that app
- Change port in `.env` or `server.js`

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Videos Won't Upload
- Check `uploads/videos` folder exists
- Check disk space
- Check file format (MP4, WebM, AVI, MKV, MOV only)

### Can't Login
- Check browser console for errors
- Verify you registered with correct email
- Try clearing browser cache

---

## 📚 Documentation Quick Links

- **[README.md](README.md)** - Complete documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - How to deploy online
- **[SECURITY.md](SECURITY.md)** - Security best practices
- **[API.md](API.md)** - API reference for developers

---

## 🎯 What's Next?

### For Testing:
1. Register a few test accounts
2. Upload some videos
3. Try commenting with images
4. Test the share feature
5. Toggle dark/light mode

### For Production:
1. Read [SECURITY.md](SECURITY.md)
2. Change JWT_SECRET
3. Set up a real database (MongoDB/PostgreSQL)
4. Deploy to Railway/Render/Vercel
5. Use cloud storage for videos (AWS S3, Cloudflare R2)

### For Developers:
1. Check [API.md](API.md) for endpoint details
2. Explore `server.js` to understand the backend
3. Look at `app.js` for frontend logic
4. Customize features as needed

---

## 💡 Pro Tips

1. **Use Cloud Storage**: For production, don't store videos on the same server. Use AWS S3 or Cloudflare R2.

2. **Database**: Replace JSON files with MongoDB or PostgreSQL for better performance.

3. **CDN**: Use Cloudflare to cache and serve videos faster globally.

4. **Backups**: Always backup uploaded videos and user data.

5. **Monitoring**: Set up logging to track errors and usage.

6. **SSL**: Always use HTTPS in production (most platforms provide this automatically).

---

## 🆘 Need Help?

**Common Issues:**
1. Check the README.md
2. Look for error messages in:
   - Browser console (F12)
   - Terminal where server is running
3. Verify all files are in the right place
4. Make sure Node.js is installed

**Still Stuck?**
- Double-check you followed all setup steps
- Try the manual setup method
- Restart your computer and try again

---

## 🎉 You're Ready!

**Local Development:**
1. Run `npm start`
2. Visit `http://localhost:3000`
3. Create account, upload, enjoy!

**Going Live:**
1. Push code to GitHub
2. Deploy to Railway/Render
3. Share your URL with the world!

---

## 📊 Features Checklist

After setup, test these features:

- [ ] Register new user
- [ ] Login
- [ ] Upload video
- [ ] Watch video
- [ ] Skip forward/back 30s
- [ ] Toggle loop
- [ ] Try picture-in-picture
- [ ] Post comment
- [ ] Upload image with comment
- [ ] Click blurred image to reveal
- [ ] Share video (get short link)
- [ ] Toggle dark/light mode
- [ ] Test on mobile device

---

## 🚀 Launch Checklist

Before going public:

- [ ] Changed JWT_SECRET
- [ ] Tested all features
- [ ] Set up HTTPS
- [ ] Configured CORS properly
- [ ] Set up database (not JSON files)
- [ ] Configured cloud storage for videos
- [ ] Set up backups
- [ ] Added monitoring/logging
- [ ] Tested on multiple devices
- [ ] Read security guide

---

**Welcome to the cyberpunk future of video sharing! 💜⚡**

Made with passion and neon dreams 🎬✨
