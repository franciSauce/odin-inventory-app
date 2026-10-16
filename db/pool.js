const { Pool } = require('pg');
const { env } = require('node:process');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: require('node:path').join(__dirname, '.env') });
}

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, CONNECTION_STRING } = env;

const pool = CONNECTION_STRING
    ? new Pool({ connectionString: CONNECTION_STRING, ssl: {
        rejectUnauthorized: false }})
        : new Pool({
            host: DB_HOST,
            user: DB_USER,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: DB_PORT ? Number(DB_PORT) : undefined,
        });

module.exports = pool;