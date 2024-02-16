/*
    Contains validations methods for checking mandatory fields such as names, title and salary
    Logic = if validation fails  => throws error
            if validation passes => returns the input value and the app continues normally
*/


//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

//valid text input is alphabets only which can be up to 30 characters long and cannot be empty
const validateName = name =>{
    const regex = /^[a-zA-Z ]{1,30}$/;
    switch(true){
        case (!regex.test(name)):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Value: Value must contain alphabets only and can be upto 30 characters long!\x1b[0m`);
        default:
            return name.trim();
    }
};

//valid salary >=0, and  <1,000,000.00
//because our schema constraint is decimal(8,2)
//we are taking salary input as a string, instead of a number
// because number type has some rendering issues when invalid in the inquirer
const validateSalary = salary =>{

    switch(true){
        case (!Number(salary)):
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Salary: Salary must be a number!\x1b[0m`);
        case (Number(salary) < 0) :
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Salary: Salary cannot be less than 0!\x1b[0m`);
        case (Number(salary) >= 1000000) :
            throw new Error(`${logSymbols.error} \x1b[3;31m Invalid Salary: Salary must be less that $1,000,000.00!\x1b[0m`);
        default:
            return Number(salary);
   }
};
module.exports = {validateName, validateSalary};
