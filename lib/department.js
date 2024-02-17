/*
    Contains department table realated queries

*/

// importing the connection to the database.
const connection = require("../config/db-connection");
//importing help function to create a random id
const getARandomId = require("../helpers/uuid");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");



//----------------------------------Get All
//returns a list of all departments
const getDepartments = async () =>{
    try{
        const queryString =`SELECT * FROM department ORDER BY department_name`;
        const result= await connection.query(queryString);
        const departments = result.map(({id, department_name})=>({name: department_name, value: id}));
        return departments;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//----------------------------------View All
//displays a list of all departments
const viewAllDepartments = async() =>{
    try{
        // |-- Id --|-- Department --|
        const queryString =`SELECT id AS Id, department_name AS "Department" FROM department`;
        const result = await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92m All Departments retrieved!\x1b[0m`);
        console.table(result);
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};
//---------------------------------- Add New
//adds a new department
const addNewDepartment = async(answer) =>{
    try{
        const aRandomId = await getARandomId("Department");
        const queryString = `INSERT INTO department (id, department_name) VALUES (${aRandomId}, "${answer['department-name']}")`;
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mDepartment with id ${aRandomId} added!\x1b[0m`);
        return await viewAllDepartments();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};
//---------------------------------- Delete
//removes the department with given id
const deleteDepartment = async(answer) =>{
    const id = answer.departmentToBeDeleted;
    try{
        const queryString = `DELETE FROM department WHERE id = ${id}`;
        
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mDepartment with id ${id} deleted!\x1b[0m`);
        return await viewAllDepartments();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Total Budget
//displays the total budget of the department with given id
//department => roles => employees
const viewUtilizedBudgetOfDepartment = async(answer) =>{
    const id = answer.departmentBudget;
    try{
        // |-- Department --|-- Utilized Budget --|-- Total Employees --|
        const queryString = `SELECT d.department_name as Department, SUM(r.salary) AS "Utilized Budget", COUNT(e.id) AS "Total Employees" FROM department AS d INNER JOIN role as r ON d.id = r.department_id INNER JOIN employee AS e ON r.id = e.role_id WHERE d.id = ${id}`;
        
        const result = await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mDepartment with id ${id}'s total utilized budget retrieved!\x1b[0m`);
        console.table(result);
        
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};


module.exports = {viewAllDepartments, addNewDepartment, deleteDepartment, getDepartments, viewUtilizedBudgetOfDepartment};



