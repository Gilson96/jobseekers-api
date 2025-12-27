import type { User } from "../types/index.js";
import db from '../data/connection.js'

export const create = ({ name, email, password, number, address, cv }: User) => {
    return db
        .query(
            `INSERT INTO users(name,email,password,number,address,cv, role) VALUES ($1,$2,$3,$4,$5,$6,DEFAULT) RETURNING *;`,
            [name, email, password, number, address, cv]
        )
        .then(({ rows }: { rows: User[] }) => {
            return rows;
        });
};

export const findOne = (user_id?: number, email?: string) => {
    if (user_id === undefined) {
        return db
            .query(`SELECT * FROM users WHERE email = $1;`, [email])
            .then(({ rows }: { rows: User[] }) => {
                return rows;
            });
    } else {
        return db
            .query(`SELECT users.*,
                ARRAY_AGG(DISTINCT jsonb_build_object(
                'skills_user_id', skills_user.skills_user_id,
                'skills_name', skills.skills_name,
                'skills_id', skills.skills_id
                )) AS skills,
                ARRAY_AGG(DISTINCT jsonb_build_object( 
                'job_id',job.job_id, 
                'title', job.title,
                'location', job.location,
                'company_name', company.company_name
                )) AS jobs_applied
                FROM users
                LEFT JOIN skills_user ON skills_user.user_id = users.user_id
                LEFT JOIN skills ON skills.skills_id = skills_user.skills_id
                LEFT JOIN application_user ON application_user.user_id = users.user_id
                LEFT JOIN application ON application.user_id = application_user.user_id
                LEFT JOIN job ON job.job_id = application.job_id
                LEFT JOIN company ON company.company_id = job.company_id
                WHERE users.user_id = $1
                GROUP BY users.user_id;`, [user_id])
            .then(({ rows }: { rows: User[] }) => {
                return rows;
            });
    }
};

export const update = ({ name, email, password, number, address, cv, user_id }: User) => {
    return db
        .query(
            `UPDATE users 
       SET name = COALESCE($1, name),
       email = COALESCE($2, email),       
       password = COALESCE($3, password),       
       number = COALESCE($4, number),
       address = COALESCE($5, address),
       cv = COALESCE($6, cv)
       WHERE user_id = $7 RETURNING *;`,
            [name, email, password, number, address, cv, user_id]
        )
        .then(({ rows }: { rows: User[] }) => {
            return rows;
        });
};

export const deleteId = (user_id: number) => {
    return db
        .query(`DELETE FROM users WHERE user_id = $1 RETURNING *;`, [user_id])
        .then(({ rows }: { rows: User[] }) => {
            return rows;
        });
};
