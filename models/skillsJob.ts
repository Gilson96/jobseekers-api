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

export const deleteId = (skills_job_id: number) => {
    return db
        .query(
            `DELETE FROM skills_job WHERE skills_job_id = $1 RETURNING *;`,
            [skills_job_id]
        )
        .then(({ rows }: { rows: Skills_job[] }) => {
            return rows;
        });
};
