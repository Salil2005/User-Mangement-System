const { Pool } = require("pg");

const pool = new Pool({
 user: "postgres",
 host: "localhost",
 database: "user_system",
 password: "2103",   
 port: 5432,
});

module.exports = pool;