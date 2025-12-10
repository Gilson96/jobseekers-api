import db from "../data/connection.js";
import type { Saved_job } from "../types/index.js";

export const create = (user_id: number, job_id: number) => {
    return db
        .query(
            `INSERT INTO saved_job (user_id, job_id) VALUES($1, $2) RETURNING *;`,
            [user_id, job_id]
        )
        .then(({ rows }: { rows: Saved_job[] }) => {
            return rows;
        });
};

export const findAll = (user_id: number) => {
    return db.query(`SELECT * FROM saved_job WHERE user_id = $1;`, [user_id])
        .then(({ rows }: { rows: Saved_job[] }) => {
            return rows;
        });
}

export const deleteId = (saved_job_id: number) => {
    return db.query(`DELETE FROM saved_job WHERE saved_job_id = $1;`, [saved_job_id])
        .then(({ rows }: { rows: Saved_job[] }) => {
            return rows;
        });
};