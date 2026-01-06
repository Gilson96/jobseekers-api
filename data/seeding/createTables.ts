import db from "../connection.js";

export const createTables = () => {

  return db.query(
    `CREATE TABLE company (
        company_id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        number VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        role VARCHAR(10) DEFAULT 'admin' NOT NULL
        );`
  )
    .then(() => {
      return db.query(`CREATE TABLE skills (
              skills_id SERIAL PRIMARY KEY,
              skills_name VARCHAR(255)
              );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE job (
          job_id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          location VARCHAR(255),
          pay VARCHAR(255),
          type VARCHAR(255),
          company_id INTEGER REFERENCES company(company_id) ON DELETE CASCADE,
          description json
          );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          number VARCHAR(255),
          address VARCHAR(255),
          cv BYTEA,
          role VARCHAR(10) DEFAULT 'user' NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE skills_user(
      skills_user_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      skills_id INTEGER REFERENCES skills(skills_id) ON DELETE CASCADE
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE skills_job (
      skills_job_id SERIAL PRIMARY KEY,
      job_id INTEGER REFERENCES job(job_id) ON DELETE CASCADE,
      skills_id INTEGER REFERENCES skills(skills_id) ON DELETE CASCADE,
      CONSTRAINT skills_job_unique
      UNIQUE (job_id, skills_id)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE application (
      application_id SERIAL PRIMARY KEY,
      job_id INTEGER REFERENCES job(job_id) ON DELETE CASCADE, 
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE application_user (
      application_user_id SERIAL PRIMARY KEY,
      application_id INTEGER REFERENCES application(application_id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE application_job (
      application_job_id SERIAL PRIMARY KEY,
      guest_name VARCHAR(255),
      guest_email VARCHAR(255),
      guest_cv VARCHAR(255),
      application_id INTEGER REFERENCES application(application_id) ON DELETE CASCADE,
      job_id INTEGER REFERENCES job(job_id) ON DELETE CASCADE
      );`);
    }).then(() => {
      return db.query(`CREATE TABLE saved_job (
        saved_job_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        job_id INTEGER REFERENCES job(job_id) ON DELETE CASCADE
        );`)
    })
}