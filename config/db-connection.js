// Import and require mysql2
const mysql = require("mysql2");
const util = require("node:util"); 
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");
//importing and configuring dotenv
require("dotenv").config();
// Connect to database
let connection;
connection = mysql.createConnection(
// const connection = mysql.createConnection(
    {
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
    },
    console.log(`${logSymbols.success}`, `\x1b[3;92mConnected to the my_company_db database.\x1b[0m`)
);
// ).promise();
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connect to the database
connection.connect(function(err){
    if (err) {
        console.log(`${logSymbols.error}`, ` \x1b[3;31merror connecting: ${ err.stack}\x1b[0m`);
        return;
    };
    console.log(`${logSymbols.success}`, `\x1b[3;92mconnected as... ${connection.threadId}\x1b[0m`);
});

module.exports = connection;