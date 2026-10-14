const { Pool } = require('pg');
const { env } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, CONNECTING_STRING } = env;

const pool = CONNECTING_STRING
    ? new Pool({ connectionString: CONNECTING_STRING, ssl: {
        rejectUnauthorized: false }})
        : new Pool({
            host: DB_HOST,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: DB_PORT ? Number(DB_PORT) : undefined,
        });

module.exports = pool;