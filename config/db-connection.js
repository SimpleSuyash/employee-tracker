// Import and require mysql2
const mysql = require("mysql2");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");
//importing and configuring dotenv
require("dotenv").config();
// Connect to database
const pool = mysql.createPool(
// const connection = mysql.createConnection(
    {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        connectionLimit : 5
    },
    console.log(`Connected to the my_company_db database.`)
);
// ).promise();

// connection.connect((err => {
//     if(err) throw err;
//     console.log(`${logSymbols.success}`, `\x1b[3;92mmy_company_db Connected\x1b[0m`);
// }));

//
exports.pool = pool;