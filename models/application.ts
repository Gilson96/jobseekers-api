import db from "../data/connection.js";
import type { Application } from "../types/index.js";

export const create = (job_id: number, user_id: number, cv: Express.Multer.File) => {
    return db
        .query(
            `INSERT INTO application (job_id, user_id, cv) VALUES($1, $2, $3) RETURNING *;`,
            [job_id, user_id, cv]
        )
        .then(({ rows }: { rows: Application[] }) => {
            return rows;
        });
};

