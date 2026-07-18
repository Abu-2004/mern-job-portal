# 🚀 MERN Job Portal

A full-stack Job Portal built using the MERN Stack.

Users can register, login, upload resumes, search jobs, apply for jobs, save jobs, while recruiters can create jobs, upload company logos, manage postings, and view applicants.

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt

---

## Job Seeker

- View Jobs
- Search Jobs
- View Job Details
- Apply Jobs
- Save Jobs
- Upload Resume
- View Resume
- User Profile

---

## Recruiter

- Create Job
- Edit Job
- Delete Job
- Upload Company Logo
- View My Jobs
- View Applicants
- Download Applicant Resume

---

## Backend

- REST API
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- MVC Architecture

---

## Frontend

- React
- React Router
- Axios
- Context API
- Protected Routes
- Responsive UI

---

# 🛠 Tech Stack

Frontend

- React
- React Router
- Axios
- CSS

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas

Authentication

- JWT
- bcrypt

File Upload

- Multer

---

# 📂 Project Structure

```
client/
server/

controllers/
models/
routes/
middleware/
uploads/

```

---

# 📸 Screenshots

soon

---

# Installation

## Clone

```bash
git clone https://github.com/yourusername/mern-job-portal.git
```

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

```
PORT=

MONGO_URI=

JWT_SECRET=
```

---

# API Endpoints

Authentication

```
POST /api/auth/register
POST /api/auth/login
```

Jobs

```
GET /api/jobs
POST /api/jobs
PUT /api/jobs/:id
DELETE /api/jobs/:id
GET /api/jobs/search
POST /api/jobs/:id/apply
POST /api/jobs/:id/save
GET /api/jobs/:id/applicants
```

Profile

```
GET /api/users/profile
PUT /api/users/profile
```

Upload

```
POST /api/upload/resume
POST /api/upload/logo
```

---

# Future Improvements

- Email Notifications
- Admin Dashboard
- Forgot Password
- Dark Mode

---

# Author

**ABUBAKKAR SIDDIQ**

Built as a Full Stack MERN Portfolio Project.
