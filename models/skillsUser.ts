import db from "../data/connection.js";
import type { Skills_user } from "../types/index.js";

export const create = (skills_id: number, user_id: number) => {
    return db
        .query(
            `INSERT INTO skills_user (skills_id, user_id) VALUES($1, $2) RETURNING *;`,
            [skills_id, user_id]
        )
        .then(({ rows }: { rows: Skills_user[] }) => {
            return rows;
        });
};

