/*
    Defines Inquirer
*/

//importing the inquirer package
const inquirer = require("inquirer");
//contains all the questions
const questions = require("./lib/prompts");
//displays query result in a table format
const consoleTbl = require("console.table");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");


//database connection setting
const connection = require("./config/db-connection");

//importing all the queries
const {viewAllDepartments, addNewDepartment, deleteDepartment, viewUtilizedBudgetOfDepartment} = require("./lib/department");
const {viewAllRoles, addNewRole, deleteRole} = require("./lib/role");
const {viewAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment} = require("./lib/employee");
//enum values for main/menu/task question
//Menu questions' text are long and tedious and prone to typos
const UseCases = require("./lib/useCases");



const initInquirer =  async () => {
    let askAgain = true;
    //loading the inquirer to initiate the prompts
    try{
        const answer = await inquirer.prompt(questions);
        switch (answer["main-question"]){

            //---------------------Department Queries
            case UseCases.AllDepartments: // Read 
                viewAllDepartments();
                break;
            case UseCases.NewDepartment:   // Create 
                addNewDepartment(answer);
                break;   
            case UseCases.DeleteDepartment: // Delete 
                deleteDepartment(answer);
                break;
            case UseCases.UtilizedBudget:   // Read Budget
                viewUtilizedBudgetOfDepartment(answer);
                break;
            //---------------------Role Queries    
            case UseCases.AllRoles: // Read
                viewAllRoles();
                break;
            case UseCases.NewRole: // Add
                addNewRole(answer);
                break;
            case UseCases.DeleteRole: // Delete
                deleteRole(answer);
                break;
            //---------------------Employee Queries    
            case UseCases.AllEmployees: // Read 
                viewAllEmployees();
                break;
            case UseCases.EmployeesOfManager: // Read Managers
                viewEmployeesByManager(answer);
                break;
            case UseCases.EmployeesOfDepartment: // Read Departments
                viewEmployeesByDepartment(answer);
                break;
            case UseCases.NewEmployee: // Add
                addNewEmployee(answer);
                break;
            case UseCases.DeleteEmployee: // Delete
                deleteEmployee(answer);
                break;
            case UseCases.EmployeeNewRole: // Update Role
                updateEmployeeRole(answer);
                break;
            case UseCases.EmployeeNewManager: // Update Manager
                updateEmployeeManager(answer);
                break;
            case "Quit":
                askAgain = false;
                console.log(`${logSymbols.success}`, `\x1b[3;92m Employee Tracker App has Closed \x1b[0m`);
                connection.close();
                process.exit(0);
        }
        //check if the main question needs to be asked again
        if(askAgain){
            initInquirer();
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

//initializing the app
initInquirer();
