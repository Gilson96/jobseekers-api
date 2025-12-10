import db from "../data/connection.js";
import type { Skills_job } from "../types/index.js";

export const create = (skills_id: number, job_id: number) => {
    return db
        .query(
            `INSERT INTO skills_job (skills_id, job_id) VALUES($1, $2) RETURNING *;`,
            [skills_id, job_id]
        )
        .then(({ rows }: { rows: Skills_job[] }) => {
            return rows;
        });
};

export const findId = (job_id: number) => {
    return db.query(`SELECT * FROM skills_job WHERE job_id = $1;`, [job_id])
        .then(({ rows }: { rows: Skills_job[] }) => {
            return rows;
        });
};
