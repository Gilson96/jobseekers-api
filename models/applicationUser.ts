import db from "../data/connection.js";
import type { Application_user } from "../types/index.js";

export const create = (application_id: number, user_id: number) => {
    return db
        .query(
            `INSERT INTO application_user (application_id, user_id) VALUES($1, $2) RETURNING *;`,
            [application_id, user_id]
        )
        .then(({ rows }: { rows: Application_user[] }) => {
            return rows;
        });
};

export const findAll = (job_id: number) => {
    return db
        .query(` 
            SELECT application_user.*, job.job_id, job.title, job.location,company.company_name
            FROM application_user
            LEFT JOIN users ON users.user_id = application_user.user_id
            LEFT JOIN application ON application.user_id = application_user.user_id
            LEFT JOIN job ON application.job_id = job.job_id
            LEFT JOIN company ON company.company_id = job.company_id
            WHERE users.user_id = $1;`, [job_id]
        )
        .then(({ rows }: { rows: Application_user[] }) => {
            return rows;
        });
};