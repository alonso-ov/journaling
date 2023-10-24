const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    user: 'root',
    password: 'Secure01!',
    database: "journaling_db"
});

export default pool;