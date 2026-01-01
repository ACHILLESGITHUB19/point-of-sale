# Point of Sale (POS) System

## 📘 Disclaimer

**This project is developed for school/educational purposes only.**
It is not intended for commercial use, production environments, or real-world financial transactions.

---

## 🧾 Project Overview

The Point of Sale (POS) System is a web-based application designed to demonstrate fundamental concepts of software development, including:

* User authentication and authorization
* Product and category management
* Basic sales transactions
* Database integration

This project serves as a learning tool for students to understand how POS systems work in a controlled, academic setting.

---

## 🎯 Objectives

* Apply web development concepts (frontend and backend)
* Practice CRUD operations using a database
* Understand session handling and user roles
* Demonstrate MVC / RESTful architecture principles

---

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript Templates)
* **Database:** MongoDB (Mongoose)
* **Authentication & Security:** bcrypt, JSON Web Tokens (JWT), csurf
* **Environment Management:** dotenv
* **Utilities:** cookie-parser

---

## 📦 Installed Dependencies

Below are the main dependencies used in this project and their purpose:

### 🔹 Production Dependencies

* **express** – Web framework for handling routes and server logic
* **mongoose** – ODM for connecting and interacting with MongoDB
* **ejs** – Template engine for rendering dynamic HTML pages
* **bcrypt** – Used for hashing user passwords securely
* **jsonwebtoken (JWT)** – Handles token-based authentication
* **cookie-parser** – Parses cookies for session and token handling
* **csurf** – Provides CSRF protection for forms
* **dotenv** – Loads environment variables from a `.env` file

### 🔹 Development Dependency

* **nodemon** – Automatically restarts the server during development

These dependencies are automatically installed when running:

````bash
npm

---

## 👥 User Roles
- **Admin:** Manage products, categories, and users
- **Staff:** Process sales and view products
- **User (optional):** View items (for demo purposes)

---

## ⚙️ Features
- Login and registration system
- Product and category management
- Sales transaction simulation
- Dashboard interface
- Secure password storage (hashed)

---

## 🚀 Installation & Setup
1. Clone the repository
   ```bash
   git clone https://github.com/ACHILLESGITHUB19/point-of-sale.git
````

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

4. Run the application

   ```bash
   npm run dev
   ```

5. Open your browser and go to:

   ```
   http://localhost:PORT
   ```

---

## 📚 Educational Notes

* No real payment gateway is integrated
* Prices and transactions are for demonstration only
* Security is basic and intended for learning

---

##  Limitations

* Not optimized for large-scale use
* No real-world accounting compliance
* Minimal error handling

---

## Programmer

**ACHILLES**
BSIS/ College Student

---

## 📝 License

This project is free to use **for educational and academic purposes only**.

---

> ⚠️ **Reminder:** Do not deploy or use this system in a real business environment.
# pos-mobile-version
# pos-mobile-version
# pos-mobile-version
