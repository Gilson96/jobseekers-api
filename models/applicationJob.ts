import db from "../data/connection.js";
import type { Application_job } from "../types/index.js";

export const create = (application_id: number, job_id: number, guest_email: string, guest_name: string, guest_cv:string) => {
    return db
        .query(
            `INSERT INTO application_job (application_id, job_id, guest_name, guest_email, guest_cv) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
            [application_id, job_id, guest_name, guest_email, guest_cv]
        )
        .then(({ rows }: { rows: Application_job[] }) => {
            return rows;
        });
};

export const findAll = (job_id: number) => {
    return db
        .query(` 
            SELECT application_job.*, users.user_id, users.name, users.email,
            users.number, users.address, users.cv
            FROM application_job
            LEFT JOIN job ON job.job_id = application_job.job_id
            LEFT JOIN application ON application.job_id = application_job.job_id
            LEFT JOIN users ON application.user_id = users.user_id
            WHERE job.job_id = $1;`, [job_id]
        )
        .then(({ rows }: { rows: Application_job[] }) => {
            return rows;
        });
};