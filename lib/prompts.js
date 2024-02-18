/*
    Contains all the questions for inquirer
*/

//importing the inquirer package
const inquirer = require("inquirer");
//importing inquirer-maxlength-input-prompt package
const maxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
inquirer.registerPrompt("input-max30", maxLengthInputPrompt);

//importing custom validation module
const{validateName, validateSalary} = require("./validations");


//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");
//can change terminal text-colour
const chalk = require("chalk");

//getting list of departments, roles, and employees and managers
const {getDepartments} = require("./department");
const {getRoles} = require("./role");
const {getEmployees, getManagers} = require("./employee");

//enum values for main/menu/task question
const UseCases = require("./useCases");


const questions = [
    //----------------Main question
    {
    type: "list",
    name: "main-question",
    message: "What would you like to do?",
    choices: [ UseCases.AllDepartments, UseCases.NewDepartment, UseCases.DeleteDepartment, UseCases.UtilizedBudget, UseCases.AllRoles, UseCases.NewRole, UseCases.DeleteRole, UseCases.AllEmployees, UseCases.NewEmployee, UseCases.DeleteEmployee, UseCases.EmployeeNewRole, UseCases.EmployeeNewManager,  UseCases.EmployeesOfManager, UseCases.EmployeesOfDepartment, "Quit"]
    },
    //----------------Department Add New
    {
        type: "input-max30",
        name: "department-name",
        message: "What is the name of the department?",
        maxLength: 30,
        validate: answer => {
            if (validateName(answer)) {
                //when validation passes, display ✔︎ in bright green colour
                console.log(`    ${logSymbols.success}`, `\x1b[3;92mDepartment Name!\x1b[0m`);
                return true;
            }
            //when validation fails, display ✖ in bright red colour
            console.log(`    ${logSymbols.error}`, `\x1b[3;31mDepartment Name!\x1b[0m`);
            return "Please enter a valid department name.";
        },
        when: response =>  response["main-question"] === UseCases.NewDepartment
    }, 
    
    //----------------Department Delete
    {
        type: "list",
        name: "departmentToBeDeleted",
        message: "Which department would you like to delete?",
        choices: getDepartments,
        // choices: getDepartments(),
        when: response =>  response["main-question"] === UseCases.DeleteDepartment
    }, 
        
    //----------------Department Utilized Budget
    {
        type: "list",
        name: "departmentBudget",
        message: "Which department's total utilized budget would you like to view?",
        choices: getDepartments,
        // choices: getDepartments(),
        when: response =>  response["main-question"] === UseCases.UtilizedBudget
    }, 
    //----------------Job role
    {
        type: "input-max30",
        name: "role-title",
        message: "What is the title of the role?",
        maxLength: 30,
        validate: answer => {
            if (validateName(answer)) {
                //when validation passes, display ✔︎ in bright green colour
                console.log(`    ${logSymbols.success}`, `\x1b[3;92mRole Title!\x1b[0m`);
                return true;
            }
            //when validation fails, display ✖ in bright red colour
            console.log(`    ${logSymbols.error}`, `\x1b[3;31mRole Title!\x1b[0m`);
            return "Please enter a valid role title.";
        },
        when: response => response["main-question"] === UseCases.NewRole
    },
    
    //----------------Role Salary
    {
        type: "input",
        /*
        type number has some issues,
        1)when validation fails, inquirer shows NaN and it cannot be deleted, and must use ↑ and ↓ keys
        2)The custom validation error message cannot be displayed
        because inquirer's NaN error message gets precedence
        // type: "number",
        */
        
        name: "role-salary",
        message: response => `What is the salary of ${chalk.blueBright(response["role-title"].trim())}?`,
        validate: answer => {
            if (validateSalary(answer)) {
                //when validation passes, display ✔︎ in bright green colour
                console.log(`    ${logSymbols.success}`, `\x1b[3;92mRole Salary!\x1b[0m`);
                return true;
            }
            //when validation fails, display ✖ in bright red colour
            console.log(`    ${logSymbols.error}`, `\x1b[3;31mRole Salary!\x1b[0m`);
            return "Please enter a valid salary.";
        },
        // default: 0,
        when: response => response["main-question"] === UseCases.NewRole
    },
     
    //----------------Role's Department
    {
        type: "list",
        name: "role-department",
        message: response => `Which department does ${chalk.blueBright(response["role-title"])} belong to?`,
        choices: getDepartments,
        when: response => response["main-question"] === UseCases.NewRole
    },
    //----------------Role Delete
    {
        type: "list",
        name: "roleToBeDeleted",
        message: "Which role would you like to delete?",
        choices: getRoles,
        when: response =>  response["main-question"] === UseCases.DeleteRole
    }, 
        
    
    //----------------Employee First Name
    {
        type: "input-max30",
        name: "employee-first-name",
        message: "What is the first name of the employee?",
        maxLength: 30,
        validate: answer => {
            if (validateName(answer)) {
                //when validation passes, display ✔︎ in bright green colour
                console.log(`    ${logSymbols.success}`, `\x1b[3;92mFirst Name!\x1b[0m`);
                return true;
            }
            //when validation fails, display ✖ in bright red colour
            console.log(`    ${logSymbols.error}`, `\x1b[3;31mFirst Name!\x1b[0m`);
            return "Please enter a valid first name.";
        },
        when: response => response["main-question"] === UseCases.NewEmployee
    },
    //----------------Employee Last Name
    {
        type: "input-max30",
        name: "employee-last-name",
        message: "What is the last name of the employee?",
        maxLength: 30,
        validate: answer => {
            if (validateName(answer)) {
                //when validation passes, display ✔︎ in bright green colour
                console.log(`    ${logSymbols.success}`, `\x1b[3;92mLast Name!\x1b[0m`);
                return true;
            }
            //when validation fails, display ✖ in bright red colour
            console.log(`    ${logSymbols.error}`, `\x1b[3;31mLast Name!\x1b[0m`);
            return "Please enter a valid last name.";
        },
        when: response => response["main-question"] === UseCases.NewEmployee
    },
    //----------------Employee's Role
    {
        type: "list",
        name: "employee-role",
        message: response => `What is ${chalk.blueBright(response["employee-first-name"])} ${chalk.blueBright(response["employee-last-name"])} 's role?`,
        choices: getRoles,
        when: response => response["main-question"] === UseCases.NewEmployee
    },
    //----------------Employee's Manager
    {
        type: "list",
        name: "employee-manager",
        message: response =>`Who is ${chalk.blueBright(response["employee-first-name"])} ${chalk.blueBright(response["employee-last-name"])}'s manager?`,
        choices: getEmployees,
        when: response => response["main-question"] === UseCases.NewEmployee
    },
    //----------------Employee Delete
    {
        type: "list",
        name: "employeeToBeDeleted",
        message: "Which employee would you like to delete?",
        choices: getEmployees,
        when: response =>  response["main-question"] === UseCases.DeleteEmployee
    }, 
    //----------------Employee Role Update
    {
        type: "list",
        name: "employeeToBeUpdatedForRole",
        message: "Which employee's role would you like to update?",
        choices: getEmployees,
        when: response =>  response["main-question"] === UseCases.EmployeeNewRole
    }, 
    {
        type: "list",
        name: "employeeNewRole",
        message: async(response)=> {
            console.log(await(getManagers()));
            for(employee of await getEmployees()){
                if(employee.value === response.employeeToBeUpdatedForRole){
                    return `What will ${chalk.blueBright(employee.name)}'s new role be?`;
                }
            }
        },
        choices: getRoles,
        when: response =>  response["main-question"] === UseCases.EmployeeNewRole
    }, 
    //----------------Employee Manager Update
    {
        type: "list",
        name: "employeeToBeUpdatedForManager",
        message: "Which employee's manager would you like to update?",
        choices: getEmployees,
        when: response =>  response["main-question"] === UseCases.EmployeeNewManager
    }, 
    {
        type: "list",
        name: "employeeNewManager",
        message: async(response)=> {
            for(employee of await getEmployees()){
                if(employee.value === response.employeeToBeUpdatedForManager){
                    return `Which new Manager will ${chalk.blueBright(employee.name)} report to henceforth?`;
                }
            }
        },
        choices: getEmployees,
        when: response =>  response["main-question"] === UseCases.EmployeeNewManager
    },
    //----------------Employee By Manager
    {
        type: "list",
        name: "manager",
        message: "Which current manager's employees would you like to view?",
        choices: getManagers,
        when: response =>  response["main-question"] === UseCases.EmployeesOfManager,
    }, 
    //----------------Employee By Department
    {
        type: "list",
        name: "department",
        message: "Which department's employees would you like to view?",
        choices: getDepartments,
        when: response =>  response["main-question"] === UseCases.EmployeesOfDepartment
    } 
];


module.exports = questions;