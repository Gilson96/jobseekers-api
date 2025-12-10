import db from "../data/connection.js";
import type { Application } from "../types/index.js";

export const create = (job_id: number, user_id: number) => {
    return db
        .query(
            `INSERT INTO application (job_id, user_id) VALUES($1, $2) RETURNING *;`,
            [job_id, user_id]
        )
        .then(({ rows }: { rows: Application[] }) => {
            return rows;
        });
};

export const findAll = () => {
    return db.query(`SELECT * FROM application`).then(({ rows }: { rows: Application[] }) => {
        return rows;
    });
};

export const findId = (application_id: number) => {
    return db
        .query(`SELECT * FROM application WHERE application_id = $1;`, [
            application_id,
        ])
        .then(({ rows }: { rows: Application[] }) => {
            return rows;
        });
}

export const deleteId = (application_id: number) => {
    return db
        .query(`DELETE FROM application WHERE application_id = $1;`, [
            application_id,
        ])
        .then(({ rows }: { rows: Application[] }) => {
            return rows;
        });
};


