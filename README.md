# Jobseekers – Backend API

An API with RESTful routes, authentication for the Jobseekers full-stack application.

---

## 🔧 Technologies used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Typescript**
- **JWT authentication**
- **Vitest**
- **Supertest**
- **Bcrypt**
- **Heroku**
  
---

## 🗄️ Database Schema Diagram

![database diagram](https://github.com/Gilson96/jobseekers-api/blob/master/assets/db_diagram.png?raw=true)

---

## 🚀 Features

- MVC architecture implemented across 10 tables
- Support for many-to-many relationships
- CRUD operations for all tables
- Role-based access control (Admin/User)
- Secure password hashing
- JWT-based authentication
- RESTful API endpoints following best practices
- Automated tests covering all API endpoints
- Database seeding for development and testing
- Error handling for API endpoints

---

## ⚙️ .env.development

```
PGDATABASE=jobseekers_api
```
## ⚙️ .env.test

```
PGDATABASE=jobseekers_api_test
```

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/Gilson96/jobseekers-api.git
cd jobseekers-api
npm install

# Create environment files
touch .env.development
touch .env.test

# Create database
npm run database

# Seed the database
npm run seed

# Start the development server
npm run dev
```

---

## 🧪 How to Run tests

- ⚠️ Important: Each test file has its own seeding, so it’s recommended to run one file at a time to avoid conflicts.
-  Run a specific test file:
  
```bash
npm test __tests__/filename.test.ts
```
---

## 🤝 Contact

👤 GitHub: @Gilson96

💼 LinkedIn: www.linkedin.com/in/gilson-de-almeida

📧 Email: grafael99@gmail.com
