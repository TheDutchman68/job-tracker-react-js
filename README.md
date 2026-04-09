# 📌 Job Tracker App (Full Stack)

A modern and fully responsive **Job Application Tracker** built with a **full-stack architecture** using **React, Node.js, Express, and MongoDB.**

This application allows users to manage their job applications efficiently, with authentication, persistent storage in a database, and real-time UI feedback.

---

## 🚀 Live Demo

https://job-tracker-react-js-bice.vercel.app

---

## ✨ Features

### 🔐 Authentication

- User registration & login (JWT-based authentication)
- Protected routes (only authenticated users can access jobs)
- Protected routes (only authenticated users can access jobs)

### 📋 Job Management (CRUD)

- Add job applications (company, position, status)
- Update job status (Applied / Interview / Rejected)
- Delete job entries
- Each user sees only their own jobs

### ⚡ UX Improvements

- Loading spinner when adding jobs
- Deleting state (visual feedback when removing jobs)
- Disabled inputs during API calls
- Success and error messages with smooth animations
- Auto-focus on inputs for better flow

### 🔍 Backend Features
- RESTful API (Express)
- MongoDB database with Mongoose
- Filtering by status
- Search by position (regex, case-insensitive)

### 📱 Responsive Design
- Fully responsive layout (desktop, tablet, mobile)
- Modern UI inspired by job tracking tools
- Clean card-based layout with smooth hover effects

---

## 🛠 Tech Stack

### Frontend
- React (Hooks: useState, useEffect, useRef)
- Vite
- CSS3 (Grid, Flexbox, Media Queries)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)

### Tools
- Git & GitHub
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

---

## ⚙️ Getting Started

Follow the steps below to run the project locally:

```bash
# Clone the repository
git clone https://github.com/TheDutchman68/job-tracker-react-js

# Navigate to the project folder
cd job-tracker

# Install dependencies
npm install

# Create a `.env` file in the project root and add:
VITE_API_URL=https://job-tracker-react-js-1.onrender.com

# Start development server
npm run dev

# The app will be available at:
http://localhost:5173
```

## 📡 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Jobs
- GET /api/jobs → get user jobs
- POST /api/jobs → create job
- PATCH /api/jobs/:id → update status
- DELETE /api/jobs/:id → delete job

## 🧠 What I Learned

- Building a full-stack application from scratch
- Creating REST APIs with Express
- Working with MongoDB & Mongoose schemas
- Implementing JWT authentication
- Managing protected routes and tokens
- Handling async operations with loading states
- Improving UX with feedback (spinners, animations)
- Structuring scalable React applications
- Connecting frontend with backend APIs
- Writing clean, maintainable, and modular code
- Using Git and GitHub for version control and feature-based commits

## 🔮 Possible Improvements

- Search & filter UI (already supported in backend)
- Pagination / infinite scroll
- Dashboard with stats (applied / interview / rejected)
- Drag & drop (kanban style like Teal)
- Dark mode 🌙
- Email reminders for applications




## 📸 Screenshots

### Desktop Auth
![Desktop Screenshot](./screenshots/Desktop%20Auth%20Login.png)
![Desktop Screenshot](/screenshots/Desktop%20Auth%20Register.png)

### Desktop 
![Desktop Screenshot](./screenshots/Desktop%201.png)
![Desktop Screenshot](/screenshots/Desktop%202.png)

### Tablet Auth 
![Tablet Screenshot](./screenshots/Tablet%20Auth%20Login.png)
![Tablet Screenshot](./screenshots/Tablet%20Auth%20Register.png)

### Tablet  
![Tablet Screenshot](./screenshots/Tablet%201.png)
![Tablet Screenshot](./screenshots/Tablet%202.png)

### Mobile Auth
![Mobile Screenshot](./screenshots/Mobile%20Auth%20Login.png)
![Mobile Screenshot](./screenshots/Mobile%20Auth%20Register.png)

### Mobile
![Mobile Screenshot](./screenshots/Mobile%201.png)
![Mobile Screenshot](./screenshots/Mobile%202.png)

## ⚠️ Note 
- Native form elements may appear slightly different across browsers (Safari vs Chrome), which is expected behavior.

## 👤 Author

Natanael Dobie
Frontend Developer (React)

- GitHub: https://github.com/TheDutchman68
- LinkedIn: www.linkedin.com/in/natanael-dobie-776059249

## 📄 License

This project is licensed under the MIT License.


