import db from "../data/connection.js";
import type { Skills } from "../types/index.js";

export const create = (skills_name: string) => {
    return db
        .query(`INSERT INTO skills (skills_name) VALUES($1) RETURNING *;`, [skills_name])
        .then(({ rows }: { rows: Skills[] }) => {
            return rows;
        });
}

export const findAll = () => {
    return db.query(`SELECT * FROM skills;`).then(({ rows }: { rows: Skills[] }) => {
        return rows;
    });
};

export const findId = (skills_id: number) => {
    return db
        .query(`SELECT * FROM skills WHERE skills_id = $1;`, [skills_id])
        .then(({ rows }: { rows: Skills[] }) => {
            return rows;
        });
};

export const update = (skills_name: string, skills_id: number) => {
    return db
        .query(
            `UPDATE skills SET skills_name = COALESCE($1, skills_name) WHERE skills_id = $2 RETURNING *;`,
            [skills_name, skills_id]
        )
        .then(({ rows }: { rows: Skills[] }) => {
            return rows;
        });
}

export const deleteId = (skills_id: number) => {
    return db
        .query(`DELETE FROM skills WHERE skills_id = $1;`, [skills_id])
        .then(({ rows }: { rows: Skills[] }) => {
            return rows;
        });
};
