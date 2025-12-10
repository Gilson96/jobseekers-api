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

export const findId = (user_id: number) => {
    return db.query(`SELECT * FROM application_user WHERE user_id = $1;`, [user_id])
        .then(({ rows }: { rows: Application_user[] }) => {
            return rows;
        });
};
