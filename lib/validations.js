//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");
const validateId = id =>{
   switch(true){
        case (id === null):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Id: Null value is received!\x1b[0m`);
        case (id === undefined):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Id: Value is not defined!\x1b[0m`);
        case (!Number.isInteger(id)):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Id: Non-integer value is received!\x1b[0m`);
        case (id < 1) :
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Id: Invalid id value is received!\x1b[0m`);
        default:
            return id;
   }
};
const validateName = name =>{
    switch(true){
        case (name === undefined):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Value: Value is not defined!\x1b[0m`);
        case (typeof name !== "string"):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Value: Value is not a string!\x1b[0m`);
        case (name.trim() === ""):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Value: Empty value is received!\x1b[0m`);
        default:
            return name.trim();
    }
};

const validateSalary = salary =>{
    switch(true){
        
        case (!Number.isInteger(salary)):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Salary: Non-number value is received!\x1b[0m`);
        case (salary < 0) :
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Salary: Negative Salary Value is received!\x1b[0m`);
        default:
            return salary;
   }
};
 

module.exports = {validateId, validateName, validateSalary};
