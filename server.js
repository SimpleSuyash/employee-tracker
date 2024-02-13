const express = require('express');
const { clog } = require('./middleware/clog');
const api = require("./routes/index.js");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");


const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);



app.listen(PORT, () =>{
  console.log(`    ${logSymbols.success}`, `\x1b[3;92m App listening at http://localhost:${PORT} \x1b[0m`);
});


