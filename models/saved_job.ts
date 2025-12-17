import db from "../data/connection.js";
import type { Saved_job } from "../types/index.js";

export const create = (user_id: number, job_id: number) => {
    return db.query(`
        INSERT INTO saved_job (user_id, job_id) VALUES($1, $2) RETURNING *;`,
        [user_id, job_id]
    ).then(({ rows }: { rows: Saved_job[] }) => {
        return rows;
    });
};

export const findOne = (user_id: number) => {
    return db.query(`
        SELECT saved_job.saved_job_id, 
        ARRAY_AGG(DISTINCT jsonb_build_object( 
        'job_id',job.job_id, 
        'title', job.title,
        'location', job.location,
        'company_name', company.company_name
        )) AS saved_jobs
        FROM saved_job
        LEFT JOIN users ON saved_job.user_id = users.user_id
        LEFT JOIN job ON saved_job.job_id = job.job_id
        LEFT JOIN company ON job.company_id = company.company_id
        WHERE users.user_id = $1
        GROUP BY  saved_job.saved_job_id;`, [user_id])
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