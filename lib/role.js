/*
    Contains all the queries related to role table
*/

// importing the connection to the database.
const connection = require("../config/db-connection");
//importing help function to create random id
const getARandomId = require("../helpers/uuid");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");


//----------------------------------Get All
//returns a list of all roles
const getRoles = async () =>{
    try{
        const queryString =`SELECT * FROM role ORDER BY title`;
        
        const result= await connection.query(queryString);
        const roles = result.map(({id, title})=>({name: title, value: id}));
        return roles;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};
//----------------------------------View All
//displays a list of all roles
const viewAllRoles = async() =>{
    try{
        // |-- Id --|-- Job Title --|-- Department --|-- Salary --|
        const queryString =`SELECT r.id AS Id, r.title AS "Job Title", d.department_name AS Department, r.salary AS Salary FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id`;
        const result = await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92m All Roles retrieved!\x1b[0m`);
        console.table(result);
        // return showPrompts;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Add New
//adds a new role
const addNewRole = async(answer) =>{
    try{
        const aRandomId = await getARandomId("Role");
        console.log(`(${aRandomId}, "${answer['role-title']}", ${answer['role-salary']}, "${answer['role-department']}")`);
        const queryString = `INSERT INTO role (id, title, salary, department_id) VALUES (${aRandomId}, "${answer['role-title']}", ${answer['role-salary']}, "${answer['role-department']}")`;
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mRole with id ${aRandomId} added!\x1b[0m`);
        return await viewAllRoles();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Delete
//removes the role with given id
const deleteRole = async(answer) =>{
    const id = answer.roleToBeDeleted;
    try{
        const queryString = `DELETE FROM role WHERE id = ${id}`;
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mJob role with id ${id} deleted!\x1b[0m`);
        return await viewAllRoles();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};


module.exports = {getRoles, viewAllRoles, addNewRole, deleteRole};