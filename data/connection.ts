import { Pool } from 'pg'
import dotenv from 'dotenv';
import path from 'path'

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.join(import.meta.dirname, '../.env.' + ENV) })

const db = new Pool()

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
    console.log(
        `Connected to ${process.env.DATABASE_URL || process.env.PGDATABASE}`
    );
}

export default db