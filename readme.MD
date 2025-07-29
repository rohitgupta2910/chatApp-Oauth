# ⚡️ Chattrix — Real-time Chat App

Welcome to **Chattrix** — a modern, real-time chat platform where users can create accounts, connect with friends, and chat instantly. Built using **Node.js**, **Express**, **MongoDB**, **Socket.io**, and **Tailwind CSS**, it’s designed for speed, simplicity, and style.

---

## 🚀 Tech Stack

- 🌐 Node.js + Express.js
- 💾 MongoDB (with Mongoose)
- 🧠 JWT Authentication
- 🔐 Google OAuth (via Passport.js)
- 📡 Socket.IO for real-time messaging
- 💅 Tailwind CSS for UI styling
- 📄 EJS for templating

---

## ✨ Features

- ✅ Sign up / Log in using Email or Google
- 🔐 JWT-based secure sessions
- 💬 Real-time messaging with Socket.IO
- 🌈 Tailwind-powered modern responsive UI
- 🔒 Google OAuth login support
- 🛠️ Environment variable support using `.env`

---

## 📁 Folder Structure

<pre>
📦 Chattrix/
├── public/               # Static assets (JS, CSS)
├── views/                # EJS templates
├── routes/               # Express route handlers
├── controllers/          # Route logic
├── models/               # MongoDB schemas
├── sockets/              # Socket.IO event handling
├── app.js                # Main entry point
└── .env                  # Environment config (not committed)
</pre>

---

## 🔧 Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/chattrix.git
cd chattrix

# 2. Install dependencies
npm install

# 3. Create a .env file
# (Refer to the .env example below)

# 4. Run the app
npm start



## 📁 .env sample
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret


## 📁 Google OAuth
To enable Google Login:

Go to Google Cloud Console

1.Create a new Project
2.Enable OAuth Consent Screen
3.Add your App name, scopes, and user support email
4.Create a new OAuth Client ID (choose Web Application)
5.Add the redirect URI: http://localhost:5000/auth/google/callback
6.Copy the Client ID and Client Secret
7.Paste them into your .env file:


## 🧑‍💻 Author
Made with ❤️ by Rohit Gupta