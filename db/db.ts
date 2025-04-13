import dotenv from 'dotenv'
// import mysql from 'mysql2/promise'

// export const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB,
// })
import { Pool } from 'pg';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.NEON_DB,
    ssl: {
        rejectUnauthorized: false, // Needed for Neon and many managed DBs
    },
})
