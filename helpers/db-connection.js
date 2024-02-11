// Import and require mysql2
const mysql = require("mysql2");
//importing and configuring dotenv
require("dotenv").config();
// Connect to database
const pool = mysql.createPool(
    // const db = mysql.createConnection(
    {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.eventNames.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        connectionLimit : 5
    }
);
// ).promise()

// pool.connect((err => {
//     if(err) throw err;
//     console.log(`${logSymbols.success}`, `\x1b[3;92mMySQL Connected\x1b[0m`);
// }));

//
exports.databaseConnection = pool;