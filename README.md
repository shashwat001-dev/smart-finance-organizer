# 💰 Smart Finance Organizer

### Personal Finance Dashboard & Expense Tracker (Full Stack Web Application)

🔗 **Live Demo:** https://gleaming-lokum-158db8.netlify.app

---

## 📌 Project Overview

Smart Finance Organizer is a full-stack web application designed to simplify personal financial management. It allows users to track daily expenses, manage monthly budgets, and analyze spending patterns through a clean and secure dashboard.

The application follows a **client-server architecture** and implements **JWT-based authentication** to ensure secure access and user-specific data handling.

---

## 🎯 Problem Statement

Managing finances using traditional methods like notebooks or spreadsheets is:

* Time-consuming
* Error-prone
* Lacking analytical insights

This project solves these problems by providing a **simple, secure, and user-focused financial management platform** without unnecessary complexity.

---

## 💡 Solution

The system provides:

* Centralized expense tracking
* Monthly budget monitoring
* Visual analytics for spending behavior
* Secure and isolated user data

Users can easily understand where their money is going and make better financial decisions.

---

## 🚀 Key Features

### 🔐 Authentication Module

* User registration and login
* JWT-based authentication
* Protected API routes using middleware

### 💸 Expense Management

* Add, view, and delete expenses
* Categorized transactions
* User-specific data isolation

### 📅 Budget Management

* Set and update monthly budget
* Single budget per user

### 📊 Analytics Dashboard

* Category-wise expense insights
* Spending visualization

### 📧 Password Recovery

* Secure token-based password reset
* Email-based reset (works locally)

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Authentication & Security

* JSON Web Token (JWT)
* Bcrypt

### Deployment

* Frontend: Netlify
* Backend: Render

---

## 🏗️ System Architecture

* Frontend communicates with backend via REST APIs
* Backend handles authentication, business logic, and database operations
* SQLite stores users, transactions, and budgets
* JWT ensures secure route protection

---

## 📂 Project Structure

```
smart-finance-organizer/
│
├── frontend/        # UI (HTML, CSS, JS)
├── backend/         # APIs & business logic
├── database/        # SQLite database
└── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shashwat001-dev/smart-finance-organizer.git
cd smart-finance-organizer
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Run Frontend

* Open `frontend/index.html` in your browser
* (Optional: use Live Server)

---

## 🧪 Testing & Deployment Insights

### ✅ Working Features

* Authentication (JWT)
* Expense management
* Budget tracking
* Analytics dashboard

### ⚠️ Known Limitations

* Password reset through email may not work on deployed backend
* SQLite data resets due to free-tier hosting
* Backend may have cold start delay

---

## 🔮 Future Enhancements

* 💰 Income tracking
* 📱 Mobile responsive UI
* 🔔 Budget alerts
* ✏️ Edit/update expenses
* 👥 Group expense sharing
* ☁️ Migration to PostgreSQL

---

## 👨‍💻 Author

**Shashwat Singh Namdeo**
MCA Student | Full Stack Web Developer

---

## ⭐ Support

If you found this project useful, give it a ⭐ on GitHub!
