# Jobseekers – Backend API

An API with RESTful routes, authentication for the Jobseekers full-stack application.

---

## Technologies used

- Node.js
- Express.js
- PostgreSQL
- TypeScript
- JWT authentication
- Vitest
- Supertest
- Bcrypt
- Heroku
  
---

## Database Schema Diagram

![database diagram](https://github.com/Gilson96/jobseekers-api/blob/master/assets/db_diagram.png?raw=true)

---

## Features

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

## .env.development

```
PGDATABASE=jobseekers_api
```
## .env.test

```
PGDATABASE=jobseekers_api_test
```

---

## API Endpoints

### Public
- POST /api/login
- GET /api/job
- GET /api/job/:job_id
- GET /api/search
- GET /api/skills

### Authenticated Users
- GET /api/users/:user_id
- PATCH /api/users/:user_id
- DELETE /api/users/:user_id
- POST /api/applications
- GET /api/saved_job/:user_id
- POST /api/saved_job
- DELETE /api/saved_job/:saved_job_id

### Admin
- POST /api/job
- PATCH /api/job/:job_id
- DELETE /api/job/:job_id
- POST /api/skills
- POST /api/company
- GET /api/company/:company_id
- PATCH /api/company/:company_id
- DELETE /api/company/:company_id

---

## How to Run Locally

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

## How to Run Tests

- ⚠️ Important: Each test file has its own seeding, so it’s recommended to run one file at a time to avoid conflicts.
-  Run a specific test file:
  
```bash
npm test __tests__/filename.test.ts
```
---

## Contact

LinkedIn: [www.linkedin.com/in/gilson-de-almeida](https://www.linkedin.com/in/gilson-de-almeida)
Email: grafael99@gmail.com
