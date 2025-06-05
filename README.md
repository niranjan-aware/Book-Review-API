#  Niranjan Aware [![Portfolio]](https://niranjan-s-studio.netlify.app/)
#  Book Review API - Full Stack Application (frontend developed for better testing) 
#  Checkout the Live Demo for testing assignment


[![Assignment Live Demo]](https://book-review-api-viyp.onrender.com/)
[![API Collection]](https://www.postman.com/descent-module-astronomer-20357494/workspace/billeasy/collection/21191772-97b71a9e-9dff-46fa-bcf6-d5d37f57ed29?action=share&creator=21191772)

## 🎯 Project Overview

This is a full-stack Book Review API application that demonstrates modern web development practices, authentication patterns, and clean architecture. The project includes both a robust backend API and an interactive frontend interface.

### 🌟 Key Features

- **JWT Authentication** - Secure user registration and login system
- **Book Management** - Add, view, and search books with advanced filtering
- **Review System** - Rate and review books with user permissions
- **Real-time Search** - Search books by title or author with instant results
- **Responsive UI** - Modern React frontend with Tailwind CSS
- **RESTful API** - Well-structured endpoints following REST conventions
- **Data Validation** - Comprehensive input validation and error handling

## 🚀 Live Application

- **Frontend Application**: [https://book-review-api-viyp.onrender.com/](https://book-review-api-viyp.onrender.com/)
- **Backend API**: Hosted on Render (auto-deployed from GitHub)
- **API Documentation**: [Postman Collection](https://www.postman.com/descent-module-astronomer-20357494/workspace/billeasy/collection/21191772-97b71a9e-9dff-46fa-bcf6-d5d37f57ed29?action=share&creator=21191772)

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React** - User interface library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### DevOps & Deployment
- **Render** - Backend hosting && Frontend hosting
- **GitHub** - Version control and CI/CD

## 📋 API Endpoints

### Authentication
```http
POST /api/auth/signup     # Register new user
POST /api/auth/login      # User login
POST /api/auth/logout     # User logout
GET  /api/auth/check      # Verify authentication
```

### Books
```http
POST /api/books           # Add new book (Auth required)
GET  /api/books           # Get all books (with pagination)
GET  /api/books/:id       # Get book details with reviews
GET  /api/search          # Search books by title/author
```

### Reviews
```http
POST /api/books/:id/reviews  # Add review (Auth required)
PUT  /api/reviews/:id        # Update own review
DELETE /api/reviews/:id      # Delete own review
```

## 🏗️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Book Model
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  price: Number,
  createdAt: Date
}
```

### Review Model
```javascript
{
  _id: ObjectId,
  bookId: ObjectId (Book),
  userId: ObjectId (User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/niranjan-aware/Book-Review-API.git
cd Book-Review-API
```

### 2. Backend Setup
```bash
# Install backend dependencies
cd backend
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
# .env file should contain:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
# Install frontend dependencies
cd ../frontend
npm install

# Create environment file for frontend
echo "VITE_API_URL=http://localhost:5000" > .env
```

### 4. Database Setup
Ensure MongoDB is running on your system or update the `MONGODB_URI` in your `.env` file to point to your MongoDB Atlas cluster.

## 🚀 Running the Application

### Development Mode

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
# Application will start on http://localhost:5173
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start production server
cd ../backend
npm start
```

##  Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### 3. Add a Book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "P L Deshpande",
    "author": "P L Deshpande",
    "genre": "Comedy",
  }'
```

### 4. Search Books
```bash
curl "http://localhost:3000/api/search?q=desh"
```

## 📁 Project Structure

```
Book-Review-API/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Authentication & validation
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Database connection
│   │   └── index.js         # Server entry point
│   ├── .env.example         # Environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎯 Design Decisions

- **MERN Stack**: Chosen for its modern, scalable architecture
- **JWT Authentication**: Stateless authentication for better scalability
- **MongoDB**: NoSQL database for flexible schema design
- **Tailwind CSS**: Utility-first approach for rapid UI development
- **Vite**: Modern build tool for faster development experience

## 🚀 Future Enhancements

- [ ] User profiles with reading history
- [ ] Book recommendation system
- [ ] Social features (follow users, book lists)
- [ ] Image upload for book covers
- [ ] Email notifications for new reviews

## 👨‍💻 Developer

**Niranjan Aware**
- Portfolio: [https://niranjan-s-studio.netlify.app/](https://niranjan-s-studio.netlify.app/)
- LinkedIn: [Connect with me](https://linkedin.com/in/niranjan-aware)
- Email: niranjanaware26@gmail.com


---
