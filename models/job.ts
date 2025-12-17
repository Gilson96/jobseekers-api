import type { Job } from "../types/index.js";
import db from '../data/connection.js'
import { format } from "node-pg-format";

export const create = ({ title, location, pay, type, company_id, description }: Job) => {
    return db
        .query(
            `INSERT INTO job (title,location,pay,type,company_id,description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
            [title, location, pay, type, company_id, description]
        )
        .then(({ rows }: { rows: Job[] }) => {
            return rows;
        })
};

export const findAll = () => {
    return db.query(`
        SELECT job.*, company.company_name, company.company_id 
        FROM job 
        LEFT JOIN company 
        ON job.company_id = company.company_id;`
    ).then(({ rows }: { rows: Job[] }) => {
        return rows;
    });
};

export const findId = (job_id: number) => {
    return db
        .query(`SELECT job.*, company_name,
        ARRAY_AGG(DISTINCT skills.skills_name) AS skills
        FROM job
        LEFT JOIN company ON job.company_id = company.company_id
        LEFT JOIN skills_job ON skills_job.job_id = job.job_id
        LEFT JOIN skills ON skills.skills_id = skills_job.skills_id
        WHERE job.job_id = $1
        GROUP BY job.job_id, company.company_name`, [job_id])
        .then(({ rows }: { rows: Job[] }) => {
            return rows;
        });
};

export const update = ({ title, location, pay, type, description, job_id }: Job) => {
    return db
        .query(
            `UPDATE job 
      SET title = COALESCE($1, title), 
      location = COALESCE($2, location), 
      pay = COALESCE($3, pay), 
      type = COALESCE($4, type), 
      description = COALESCE($5, description) 
      WHERE job_id = $6 RETURNING *;`,
            [title, location, pay, type, description, job_id]
        )
        .then(({ rows }: { rows: Job[] }) => {
            return rows;
        });
};

export const deleteId = (job_id: number) => {
    return db
        .query(`DELETE FROM job WHERE job.job_id = $1 RETURNING *;`, [job_id])
        .then(({ rows }: { rows: Job[] }) => {
            return rows;
        });
};

export const search = (job_title = '', company_name = '', skills_name = '') => {
    const findJob = format(`
        SELECT job.*, company_name,
        ARRAY_AGG(DISTINCT skills.skills_name) AS skills
        FROM job
        LEFT JOIN company ON job.company_id = company.company_id
        LEFT JOIN skills_job ON skills_job.job_id = job.job_id
        LEFT JOIN skills ON skills.skills_id = skills_job.skills_id
        WHERE title ILIKE '%${job_title}%' 
        OR company.company_name ILIKE '%${company_name}%'
        OR skills.skills_name ILIKE '%${skills_name}%'
        GROUP BY job.job_id, company.company_name
        ;`
    )
    return db.query(findJob).then(({ rows }) => {
        return rows
    })
};
