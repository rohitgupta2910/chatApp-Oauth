# ⚡️ Chattrix — Real-time Chat App

Welcome to **Chattrix** — a modern, real-time chat platform where users can create accounts, connect with friends, and chat instantly. Built using **Node.js**, **Express**, **MongoDB**, **Socket.io**, and **Tailwind CSS**, it’s designed for speed, simplicity, and style.

---

## 🚀 Tech Stack

- 🌐 **Node.js** + **Express.js**
- 💾 **MongoDB** (with Mongoose)
- 🧠 **JWT** Authentication
- 🔐 **Google OAuth** (via Passport.js)
- 📡 **Socket.IO** for real-time messaging
- 💅 **Tailwind CSS** for UI styling
- 📄 **EJS** for templating

---

## ✨ Features

- ✅ User authentication (Signup/Login with password or Google)
- 💬 Real-time messaging using Socket.IO
- 🧠 Secure JWT-based session management
- 🌈 Beautiful responsive UI with TailwindCSS
- 📱 Works great on mobile and desktop
- 🔒 Google OAuth login support
- 📁 Organized structure with environment config support

---

## 📁 Folder Structure

📦 Chattrix/
├── public/ # Static assets (JS, CSS)
├── views/ # EJS templates
├── routes/ # Express route handlers
├── controllers/ # Route logic
├── models/ # MongoDB schemas
├── sockets/ # Socket.IO handling
├── app.js # Main entry file
└── .env # Environment variables

yaml
Copy
Edit

---

## 🧪 .env Sample

MONGODB_URI=your-mongo-db-connection-string
PORT=5000
JWT_SECRET=your-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
Replace your-* with your actual secrets.
✅ Make sure to add .env to .gitignore to keep your secrets safe.

🛠️ Installation & Run Locally
bash
Copy
Edit
# 1. Clone the repository
git clone 
cd folderName

# 2. Install dependencies
npm install

# 3. Setup your .env file
# (see the .env sample above)

# 4. Run the app
npm start
Visit http://localhost:5000

🔗 Google OAuth Setup
To enable Google login:

Go to Google Cloud Console

Create a new project → Enable OAuth Consent Screen

Add a Web OAuth Client ID

Add http://localhost:5000/auth/google/callback to redirect URI

Paste GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env

📸 UI Preview
You can add screenshots or a short GIF here showcasing:

Login page

Chat interface

Google OAuth

🙌 Author
Built with ❤️ by Rohit Gupta
