//importing the inquirer package
const inquirer = require("inquirer");
//importing inquirer-maxlength-input-prompt package
// const maxLengthInputPrompt = require("inquirer-maxlength-input-prompt");
// inquirer.registerPrompt("input-max30", maxLengthInputPrompt);

const{validateName, validateSalary} = require("./validations");

//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

const consoleTbl = require("console.table");

const questions = require("./questions");

const getDepartments = () =>{
    fetch('/api/department', {
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
};
const viewAllDepartments = () => {
    getDepartments().then(data => console.log(data));
};
const initInquirer =  async () => {
    const response = await inquirer.prompt(questions.mainQuestion);
    switch (response["main-question"]){
        case "View All Departments":
            viewAllDepartments();
            break;
    }
    // if(response["main-question"] === "View All Departments"){
    //     viewAllDepartments();
    // }
}


module.exports = initInquirer;