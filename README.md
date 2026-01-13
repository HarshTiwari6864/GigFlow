# GigFlow 🔥

_A freelance marketplace built with a modern full-stack architecture._

GigFlow is a platform where clients can post gigs, freelancers can bid on them, and gig owners can review proposals and hire talent. It includes authentication, real-time UI updates, profile management, and secure interactions between users — all wrapped up in a clean, responsive interface.

---

## 🚀 Features

### Core Features

✅ User Authentication (login/register with secure JWT cookies)  
✅ Profile Management (update photo, name, about)  
✅ Create, View & Search Gigs  
✅ Submit Bids on Gigs  
✅ Gig Owner can View & Hire Bids  
✅ Projects Dashboard (Posted gigs & Hired projects)  
✅ Responsive UI for Desktop & Mobile  
✅ Cloudinary Image Uploads (profile photos)  
✅ Backend API with secure routes and role restrictions

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React with Tailwind CSS |
| State & Auth | Context API, cookie-based auth |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Image Uploads | Cloudinary |
| Deployment | Vercel (frontend), Render (backend) |
| API Security | JWT stored in HTTP-Only cookies |

---

## 🧾 API Overview

The application uses a REST API under `/api`:

### Auth Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | User login with cookie |
| `/api/auth/check` | GET | Check authentication |
| `/api/auth/logout` | POST | Logout user |

### Gig Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/gigs` | GET | List all open gigs (searchable) |
| `/api/gigs` | POST | Create a new gig |
| `/api/gigs/my-projects` | GET | Fetch user’s posted & hired gigs |
| `/api/gigs/:id` | DELETE | Delete a gig (owner only) |

### Bid Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/bids` | POST | Submit a bid |
| `/api/bids/:gigId` | GET | Fetch bids for a gig (owner only) |
| `/api/bids/:bidId/hire` | PATCH | Hire a freelancer |

### Profile Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Fetch logged-in user profile |
| `/api/profile` | PUT | Update user profile (with image upload) |

---

## 🛠 Installation: Local Setup

### Backend

git clone https://github.com/HarshTiwari6864/GigFlow.git
cd GigFlow/backend
npm install

### Create .env file inside backend
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### Start backend server
npm start

### Frontend Setup
cd ../frontend
npm install

### Create .env file inside frontend
VITE_API_URL=http://localhost:5000

### Start frontend
npm run dev

### How to Use
1 Register a new account
2 Login
3 Update your profile (name, photo, bio)
4 Create a gig
5 Bid on gigs
6 Hire freelancers
7 Track projects in My Projects

👨‍💼 Author
Harsh Tiwari
Full Stack Developer
🔗 GitHub: https://github.com/HarshTiwari6864
🔗 LinkedIn: https://www.linkedin.com/in/harshtiwari17/