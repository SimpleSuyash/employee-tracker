const express = require("express");
const { clog } = require("./middleware/clog");
const api = require("./routes/index");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

const initInquirer = require("./lib/inquirer");


const PORT = process.env.PORT || 3001;
//setting up express
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Default response for not found requests
app.use((req, res) => {
  res.status(404).end();
});

//starting express
app.listen(PORT, () =>{
  console.log(`    ${logSymbols.success}`, `\x1b[3;92m App listening at http://localhost:${PORT} \x1b[0m`);
  initInquirer();
});


