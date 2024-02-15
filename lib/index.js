//importing the inquirer package
const inquirer = require("inquirer");
//importing inquirer-maxlength-input-prompt package
// const maxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
// inquirer.registerPrompt("input-max30", maxLengthInputPrompt);

// const{validateName, validateSalary} = require("./validations");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

const consoleTbl = require("console.table");

const questions = require("./questions");
const connection = require("../config/db-connection");
// const fetch = require("node-fetch");
const {viewAllDepartments, addNewDepartment, deleteDepartment, viewUtilizedBudgetOfDepartment} = require("./department");
const {viewAllRoles, addNewRole, deleteRole} = require("./role");
const {viewAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment} = require("./employee");
//enum values for main/menu/task question
const UseCases = require("./useCases");


let askAgain =true;
const initInquirer =  async () => {
    //loading the inquirer to initiate the prompts
    try{
        const answer = await inquirer.prompt(questions);
        switch (answer["main-question"]){

            //---------------------Department Queries
            case UseCases.AllDepartments:
                viewAllDepartments();
                break;
            case UseCases.NewDepartment:
                addNewDepartment(answer);
                break;   
            case UseCases.DeleteDepartment:
                deleteDepartment(answer);
                break;
            case UseCases.UtilizedBudget:
                viewUtilizedBudgetOfDepartment(answer);
                break;
            //---------------------Role Queries    
            case UseCases.AllRoles:
                viewAllRoles();
                break;
            case UseCases.NewRole:
                addNewRole(answer);
                break;
            case UseCases.DeleteRole:
                deleteRole(answer);
                break;
            //---------------------Employee Queries    
            case UseCases.AllEmployees:
                viewAllEmployees();
                break;
            case UseCases.EmployeesOfManager:
                viewEmployeesByManager(answer);
                break;
            case UseCases.EmployeesOfDepartment:
                viewEmployeesByDepartment(answer);
                break;
            case UseCases.NewEmployee:
                addNewEmployee(answer);
                break;
            case UseCases.DeleteEmployee:
                deleteEmployee(answer);
                break;
            case UseCases.EmployeeNewRole:
                updateEmployeeRole(answer);
                break;
            case UseCases.EmployeeNewManager:
                updateEmployeeManager(answer);
                break;
            
            
            case "Quit":
                askAgain = false;
                console.log(`${logSymbols.success}`, `\x1b[3;92m Employee Tracker App has Closed \x1b[0m`);
                connection.close();
                process.exit(0);
               
                // break;
        }
    }catch(error){
        if (error.isTtyError) {
            console.error(`${logSymbols.error}`, `\x1b[3;31mPrompt couldn't be rendered in the current environment\x1b[0m`);
        } else {
            console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
            console.error(`${logSymbols.error}`, `\x1b[3;31mSomething else went wrong\x1b[0m`);
        }
    }
}
const showPrompts = async () =>{
    do{
        await initInquirer();
    }while(askAgain);
};

module.exports = showPrompts;
