# HaveATalk 🌐

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8+-green.svg)](https://www.mongodb.com/)

HaveATalk is a real-time communication platform built for language learners to connect, chat, and make video calls with friends worldwide. It features an AI-powered chatbot for instant assistance, a friends system, and a seamless, responsive user experience.
<img src="/frontend/public/thumbnail.webp" alt="thumbnail" width="700"/>
## ✨ Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 👥 **Friends System**: Send, accept, and manage friend requests
- 💬 **Real-time Chat**: Instant messaging with friends using Stream Chat
- 📹 **Video/Audio Calls**: High-quality calls powered by Stream Video SDK
- 🖥️  **Screen Sharing**:Share your screen seamlessly during calls
- 🤖 **AI Chatbot**: Get help anytime with Google Gemini-powered assistant
- 🔔 **Notifications**: Stay updated on friend requests and activities
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🎯 **Onboarding Process**: Personalized setup for new users

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stream Chat** - Real-time messaging
- **Google Generative AI** - AI chatbot functionality
- **CORS** - Cross-origin resource sharing
- **cookie-parser** - Cookie handling
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **GSAP** - Animation library
- **React Hot Toast** - Toast notifications
- **Stream Chat React** - Chat UI components
- **Stream Video React SDK** - Video calling components
- **TanStack Query** - Data fetching and caching

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikhil-kamboj420/haveatalk.git
   cd haveatalk
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_API_KEY=your_google_generative_ai_api_key
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📖 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Sign up for a new account or log in with existing credentials
3. Complete the onboarding process to set up your profile
4. Explore the platform:
   - View and manage friends on the Friends page
   - Start chatting with friends
   - Initiate video/audio calls
   - Use the AI chatbot for assistance
   - Check notifications for updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

**Nikhil Kamboj**

- Email: kambojnikhil44@gmail.com
- Portfolio: [https://nikhil-kamboj-portfolio.netlify.app](https://nikhil-kamboj-portfolio.netlify.app)
- GitHub: [https://github.com/nikhil-kamboj420](https://github.com/nikhil-kamboj420)
- LinkedIn: [https://www.linkedin.com/in/nikhil-kamboj-632a8b350/](https://www.linkedin.com/in/nikhil-kamboj-632a8b350/)