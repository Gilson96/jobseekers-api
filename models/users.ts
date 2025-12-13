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

export const findAll = () => {
    return db.query(`SELECT * FROM users;`).then(({ rows }: { rows: User[] }) => {
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
            .query(`SELECT * FROM users WHERE user_id = $1;`, [user_id])
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
