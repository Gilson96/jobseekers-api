import { Pool } from 'pg'
import dotenv from 'dotenv';
import path from 'path'

const ENV = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.join(import.meta.dirname, '.env') })