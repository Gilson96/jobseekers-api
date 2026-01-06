import db from "../data/connection.js";
import type { Skills_user } from "../types/index.js";

export const create = (skills_id: number, user_id: number) => {
    return db
        .query(
            `INSERT INTO skills_user (skills_id, user_id)
             VALUES($1, $2)
             ON CONFLICT (user_id, skills_id) DO NOTHING
             RETURNING *;`,
            [skills_id, user_id]
        )
        .then(({ rows }: { rows: Skills_user[] }) => {
            return rows;
        });
};

export const deleteId = (skills_user_id: number) => {
    return db
        .query(
            `DELETE FROM skills_user WHERE skills_user_id = $1 RETURNING *;`,
            [skills_user_id]
        )
        .then(({ rows }: { rows: Skills_user[] }) => {
            return rows;
        });
};

