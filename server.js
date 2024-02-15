const express = require("express");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

const initInquirer = require("./lib/index");
const showPrompts = require("./lib/index");


const PORT = process.env.PORT || 3001;
//setting up express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//starting express
app.listen(PORT, () => {
  console.log(`${logSymbols.success}`, `\x1b[3;92m App listening at http://localhost:${PORT} \x1b[0m`);
  showPrompts();
});


