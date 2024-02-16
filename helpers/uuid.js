/*
    Generates a random number between 1 and 100
    Checks if already exist as an id in the given table
    if exist, generate another one again
    if doesn't exist returns that number to be used as Id
*/


// importing the connection to the database.
const connection = require("../config/db-connection");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

//produces a random number between 1 to 100 
//ultimately returns a number that is not being used as an id in the given table
const getARandomId = async (idFor)=>{
    
    let aRandomNumber;
    let queryString
   

    if (idFor === "Department"){
        queryString =`SELECT id FROM department`;
    }else if(idFor === "Role"){
        queryString =`SELECT id FROM role`;
    }else{
        queryString =`SELECT id FROM employee`;
    }
    
    try{
        const result = await connection.query(queryString);
        const ids = result.map(item=> item.id);
        do{
            aRandomNumber = Math.floor(Math.random()*100)+1;
        }while(ids.includes(aRandomNumber));
        return aRandomNumber;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};


module.exports = getARandomId;