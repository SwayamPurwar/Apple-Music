# Apple Music Clone — Full-Stack Music Streaming Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-darkgreen?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License MIT" />
</p>

<p align="center">
  <strong>A comprehensive, high-performance music streaming application inspired by Apple Music.</strong><br/>
  Discover new tracks, create custom playlists, explore albums and artists,<br/>
  and enjoy seamless audio playback.
</p>

<p align="center">
  <a href="https://github.com/SwayamPurwar/apple-music">
    <img src="https://img.shields.io/badge/GitHub-Source_Code-black?style=for-the-button&logo=github" alt="GitHub" />
  </a>
  <a href="https://swayampurwar.vercel.app/work/apple-music-casestudy.html">
    <img src="https://img.shields.io/badge/Portfolio-Case_Study-blue?style=for-the-button" alt="Case Study" />
  </a>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎵 Audio Playback | Seamless, continuous music playing with a dedicated Now Playing interface |
| 📂 Playlist Management | Create, edit, and curate custom playlists tailored to your taste |
| 💿 Explore Library | Browse extensive collections of Albums, Artists, and Songs |
| ❤️ Liked Songs | Save your favorite tracks to a dedicated Liked Songs library |
| 🔍 Deep Search | Quickly find specific songs, artists, or albums |
| 🔐 Secure Authentication | Robust user authentication and protected routes using JWT |
| ☁️ Media Uploads | Upload custom tracks and cover art via integrated storage services |
| 🎨 Modern UI | Responsive, mobile-friendly interface built with React and Vite |

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite |
| **State Management** | Redux Toolkit |
| **Backend Framework** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose) |
| **Storage Service** | Local/Cloud Storage integrations |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | Custom CSS / SCSS |

## 📁 Project Structure

```text
apple-music/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route logic (album, auth, playlist, song)
│   │   ├── db/              # Database connection logic
│   │   ├── middlewares/     # Auth verification (isAuth)
│   │   ├── models/          # Mongoose schemas (Album, Playlist, Song, User)
│   │   ├── routes/          # Express API route definitions
│   │   └── services/        # File and media storage services
│   ├── app.js               # Express application setup
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI (NowPlaying, Navigation, Modals)
│   │   ├── pages/           # Main views (Home, Library, Albums, Playlists)
│   │   ├── redux/           # Redux store and slices (songSlice, playlistSlice)
│   │   ├── routes/          # Application routing (AppRoutes)
│   │   ├── services/        # Frontend API services (downloadService)
│   │   ├── App.jsx          # Root component layout
│   │   └── main.jsx         # React DOM rendering
│   ├── vite.config.js       # Vite build configuration
│   └── package.json         # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SwayamPurwar/apple-music.git 
   cd apple-music
   ```
2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```
4. **Setup Environment Variables:**
Create `.env` files in both the backend and frontend directories based on the tables below
 
5. **Run the Development Servers:** 

   **Terminal 1 (Backend):**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm run dev
   ```

## 🔑 Environment Variables

### Backend (backend/.env)

| Variable | Description | Required |
|---|---|---|
| PORT | API Port (e.g., 3000) | ✅ |
| MONGO_URI | MongoDB connection string | ✅ |
| JWT_SECRET | Secret key for JWT signing | ✅ |



### Frontend (frontend/.env)

| Variable | Description |Required |
|---|---|---|
| VITE_API_URL | Backend API Base URL | ✅ |


## 🔌 Core API Routes
| Route | Method | Description |
| --- | --- | --- |
| /api/auth/register | POST | Register a new user |
| /api/auth/login | POST | Authenticate and receive JWT |
| /api/songs | GET/POST | Fetch all songs or upload a new track |
| /api/albums/:id | GET | Retrieve details for a specific album |
| /api/playlists | GET/POST | Fetch user playlists or create a new one |
| /api/playlists/:id/add | POST | Add a song to a specific playlist |

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository.
2. **Create** a new branch: `git checkout -b feature/your-feature-name`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin feature/your-feature-name`.
5. **Open** a Pull Request.

Please ensure your code follows the existing style and includes proper TypeScript types.

## 👨‍💻 Author

**Swayam Purwar**
- **LinkedIn**: [Swayam Purwar](https://www.linkedin.com/in/SwayamPurwar)
- **GitHub**: [@SwayamPurwar](https://github.com/SwayamPurwar/)
- **Email**: [swayampurwar111104@gmail.com](mailto:swayampurwar111104@gmail.com)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by Swayam Purwar
  <br/>
</p>