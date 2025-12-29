# DigitalFlake Admin Panel 🚀

A full-stack admin dashboard built as part of the **DigitalFlake Job Hackathon**.  
The application provides a secure admin interface to manage **Categories, Subcategories, and Products** with authentication and a clean blue-white UI.

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt (password hashing)

---

## ✨ Features

### 🔐 Authentication
- Secure admin login using **JWT**
- Passwords hashed with **bcrypt**
- Protected routes (unauthenticated users cannot access admin pages)
- Logout functionality

### 📦 Admin Management
- Category management (Create, View, Delete)
- Subcategory management (linked to categories)
- Product management (linked to categories & subcategories)

### 🎨 UI / UX
- Clean **blue & white admin dashboard**
- Sidebar-based navigation
- Responsive layout
- Interactive tables with hover states
- Modern Tailwind-based design

---


---

## ⚙️ Setup Instructions

###  Follow it step by step
```bash
1️⃣ Clone the Repository:
git clone https://github.com/KislaySatyaj/digitalflake-admin-panel.git
cd digitalflake-admin-panel


---

2️⃣ Backend Setup

Navigate to Backend Folder:
cd backend

install Dependencies:
npm install

2️⃣.1️⃣ Backend Setup
 Create Environment Variables

Create a .env file inside the backend folder and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/digitalflake
JWT_SECRET=your_jwt_secret_key


2️⃣.2️⃣ Start Backend Server
npm run dev

Backend will run on:
http://localhost:5000

---

3️⃣ Frontend Setup

3️⃣.1️⃣ Navigate to Frontend Folder
cd frontend

3️⃣.2️⃣ Install Dependencies
npm install

3️⃣.3️⃣ Start Frontend Server
npm run dev


Frontend will run on:
http://localhost:5173

---


🔑 Default Admin Credentials (Local Testing)
Use the following credentials to log in:

Email: admin@digitalflake.com
Password: admin123





