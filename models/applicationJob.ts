import db from "../data/connection.js";
import type { Application_job } from "../types/index.js";

export const create = (application_id: number, job_id: number) => {
    return db
        .query(
            `INSERT INTO application_job (application_id, job_id) VALUES($1, $2) RETURNING *;`,
            [application_id, job_id]
        )
        .then(({ rows }: { rows: Application_job[] }) => {
            return rows;
        });
};

export const findId = (job_id: number) => {
    return db.query(`SELECT * FROM application_job WHERE job_id = $1;`, [job_id])
        .then(({ rows }: { rows: Application_job[] }) => {
            return rows;
        });
};
