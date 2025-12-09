import { format } from "node-pg-format"
import db from "../data/connection.js";

export const create = (name: string) => {
    return db
        .query(`INSERT INTO company (company_name) VALUES($1) RETURNING *;`, [name])
        .then(({ rows }) => {
            return rows;
        });
};

export const findAll = () => {
    return db.query(`SELECT * FROM company;`).then(({ rows }) => {
        return rows;
    });
};

export const findId = (company_id: number) => {
    return db
        .query(`SELECT * FROM company WHERE company.company_id = $1;`, [company_id])
        .then(({ rows }) => {
            return rows;
        });
};

export const update = (company_name: string, company_id: number) => {
    return db
        .query(
            `UPDATE company SET company_name = COALESCE($1, company_name) WHERE company_id = $2 RETURNING *;`,
            [company_name, company_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

export const deleteId = (company_id: number) => {
    return db
        .query(`DELETE FROM company WHERE company.company_id = $1;`, [company_id])
        .then(({ rows }) => {
            return rows;
        });
};
