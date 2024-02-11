//importing fs/promises
const {readFile, appendFile} = require("node:fs/promises");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");


const readFromFile = async (filePath) => {
    try{
        const data = await readFile(filePath);
        console.log(`${logSymbols.success}`, `\x1b[3;92m Data successfully read from ${filePath} \x1b[0m`);
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

const appendToFile = async (filePath, data) =>{
    try{
        await appendFile(filePath, data);
        console.log(`${logSymbols.success}`, `\x1b[3;92m Data successfully appended to ${filePath} \x1b[0m`);
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
}

module.exports = {readFromFile, appendToFile};