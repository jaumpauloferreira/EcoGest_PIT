const mysql = require('mysql2/promise');


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sistemaecogest",
    password: ""
});

module.exports = { db };

