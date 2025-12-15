import db from "../data/connection.js";
import type { Company } from "../types/index.js";

export const create = ({ company_name, email, password, number, address }: Company) => {
    return db
        .query(`INSERT INTO company (company_name,email,password,number,address,role) VALUES($1,$2,$3,$4,$5,DEFAULT) RETURNING *;`,
            [company_name, email, password, number, address])
        .then(({ rows }: { rows: Company[] }) => {
            return rows;
        });
};

export const findAll = () => {
    return db.query(`SELECT * FROM company;`).then(({ rows }: { rows: Company[] }) => {
        return rows;
    });
};

export const findOne = (company_id?: number, email?: string) => {
    if (company_id === undefined) {
        return db
            .query(`SELECT * FROM company WHERE email = $1;`, [email])
            .then(({ rows }: { rows: Company[] }) => {
                return rows;
            });
    } else {
        return db
            .query(`SELECT * FROM company WHERE company_id = $1;`, [company_id])
            .then(({ rows }: { rows: Company[] }) => {
                return rows;
            });
    }
};

export const update = ({ company_name, email, password, number, address, company_id }: Company) => {
    return db
        .query(
            `UPDATE company 
        SET company_name = COALESCE($1, company_name),
        email = COALESCE($2, email),       
        password = COALESCE($3, password),       
        number = COALESCE($4, number),
        address = COALESCE($5, address) 
        WHERE company_id = $6 RETURNING *;`,
            [company_name, email, password, number, address, company_id]
        )
        .then(({ rows }: { rows: Company[] }) => {
            return rows;
        });
};

export const deleteId = (company_id: number) => {
    return db
        .query(`DELETE FROM company WHERE company.company_id = $1;`, [company_id])
        .then(({ rows }: { rows: Company[] }) => {
            return rows;
        });
};
