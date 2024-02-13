//importing the inquirer package
const inquirer = require("inquirer");
//importing inquirer-maxlength-input-prompt package
const maxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
inquirer.registerPrompt("input-max30", maxLengthInputPrompt);

const{validateName, validateSalary} = require("./validations");

//can change terminal text-colour
// const chalk = require("chalk");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");



let departments = [];
let roles = [];
let managers = [];

// Get a list of existing departments from the server
const getDepartments = () =>
  fetch('/api/department', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data[0])
    .catch((error) => {
      console.error('Error:', error);
    });
/*
// Get a list of existing roles from the server
const getRoles = () =>
  fetch('/api/role', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });

// Get a list of existing managers from the server
const getEmployees = () =>
  fetch('/api/employee/managers', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data[0])
    .catch((error) => {
      console.error('Error:', error);
    });
*/

departments = getDepartments();
// roles = getRoles();
// managers = getEmployees();
//creating questions for inquirer prompts
const questions = [

    
    //question for logo shape
    {
        type: "list",
        name: "main-question",
        message: "What would you like to do?",
        choices: [ "View All Departments", "Add a New Department", "View  All Roles", "Add a New Role", "View All Employees", "Add a New Employee", "Update Employee Role", "Update Employee Manager", "View Employees By Manager", "View Employees By Department", "Delete Departments", "Delete Roles", "Delete Employees", "Quit"]
    },
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
        when: answer => {
            return answer["main-question"] === "Add a New Department";
        }
    },
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
        when: answer => {
            return answer["main-question"] === "Add a New Role";
        }
    },
    {
        type: "number",
        name: "role-salary",
        message: "What is the salary of the role?",
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
        default: 0,
        when: answer => {
            return answer["main-question"] === "Add a New Role";
        }
    },
    {
        type: "list",
        name: "role-department",
        message: response =>{
            `Which department does the ${chalk.blueBright(response["role-title"])} belongs to?`
        },
        choices: departments,
        when: answer => {
            return answer["main-question"] === "Add a New Role";
        }
    },
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
        when: answer => {
            return answer["main-question"] === "Add a New Employee";
        }
    },
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
        when: answer => {
            return answer["main-question"] === "Add a New Employee";
        }
    },
    {
        type: "list",
        name: "employee-role",
        message: response =>{
            `What is the ${chalk.blueBright(response["employee-first-name"])} ${chalk.blueBright(response["employee-last-name"])} 's role?`
        },
        choices: roles,
        when: answer => {
            return answer["main-question"] === "Add a New Employee";
        }
    },
    {
        type: "list",
        name: "employee-manager",
        message: response =>{
            `Who is the ${chalk.blueBright(response["employee-first-name"])} ${chalk.blueBright(response["employee-last-name"])} 's manager?`
        },
        choices: managers,
        when: answer => {
            return answer["main-question"] === "Add a New Employee";
        }
    },
];

// Creates a function to initialize app
async function init() {
    //loading the inquirer to initiate the prompts
    try{
        const response = await inquirer.prompt(questions);
        console.log(response);
        // writeToFile(generateSVG(response) );
    }catch(error){
        if (error.isTtyError) {
            console.error(`${logSymbols.error}`, `\x1b[3;31mPrompt couldn't be rendered in the current environment\x1b[0m`);
        } else {
            console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
            console.error(`${logSymbols.error}`, `\x1b[3;31mSomething else went wrong\x1b[0m`);
        }
    }
}

// Calling init function to initialize app
init();
//exporting the questions array
module.exports = questions;