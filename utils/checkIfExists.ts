import { format } from "node-pg-format";
import db from "../data/connection.js";

export const checkIfExists = (tableName: string, field: string, value: string | number) => {
    const query = format(`SELECT * FROM %I WHERE %I = $1;`, tableName, field);

    return db.query(query, [value]).then(({ rows }) => {
        return rows.length > 0;
    });
};