/*
    Contains all the queries related to employee table
*/

// importing the connection to the database.
const connection = require("../config/db-connection");
//importing help function to create a random id
const getARandomId = require("../helpers/uuid");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");

//----------------------------------Get All
//returns a list of all employees
const getEmployees = async () =>{
    try{
        const queryString =`SELECT * FROM employee ORDER BY first_name, last_name`;
        
        const result= await connection.query(queryString);
        const employees = result.map(({id, first_name, last_name})=>({name: first_name + " " + last_name, value: id}));
        return employees;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//----------------------------------Get All Managers(employee that are reported to by at least 1 other employee)
//return a list of all current managers
//managers are those reported to by at least one other employee
const getManagers = async () =>{
    try{
        const queryString =`SELECT DISTINCT mngr.id, CONCAT(mngr.first_name, " ", mngr.last_name) AS manager FROM employee AS emp  INNER JOIN employee AS mngr ON emp.manager_id=mngr.id ORDER BY manager`;
        
        const result= await connection.query(queryString);
        const managers = result.map(({id, manager})=>({name: manager, value: id}));
        return managers;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//----------------------------------View All
//displays a list of all employees
const viewAllEmployees = async() =>{
    try{
        // |-- Id --|-- Employee --|-- Job Title --|-- Department --|-- Salary --|-- Manager --|
        const queryString = `SELECT e.id AS Id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS 'Job Title', d.department_name AS Department, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM employee AS e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id `;
        const result = await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92m All Employees retrieved!\x1b[0m`);
        console.table(result);
        
        // return showPrompts;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Add New
//add a new employee and displays the updated list of all employees
const addNewEmployee = async(answer) =>{
    
    try{
        const roleId = answer["employee-role"];
        const managerId = answer["employee-manager"];
        const aRandomId = await getARandomId();
        const queryString = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${aRandomId}, "${answer['employee-first-name']}", "${answer['employee-last-name']}", ${roleId},  ${managerId})`;
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mDepartment with id ${aRandomId} added!\x1b[0m`);
        return await viewAllEmployees();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Delete
//removes the employee with given id and displays the updated list of all employees
const deleteEmployee = async(answer) =>{
    const id = answer.employeeToBeDeleted;
    try{
        const queryString = `DELETE FROM employee WHERE id = ${id}`;
        
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mEmployee with id ${id} deleted!\x1b[0m`);
        return await viewAllEmployees();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Update Role
//updates the role of the employee with given id, and displays the updated list of all employees
const updateEmployeeRole = async(answer) =>{
    
    try{
        const id = answer.employeeToBeUpdatedForRole;
        const roleId = answer.employeeRoleToBeUpdated;
        const queryString = `UPDATE employee SET role_id = ${roleId} WHERE id = ${id}`;
        
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mEmployee with id ${id}'s role updated!\x1b[0m`);
        return await viewAllEmployees();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Update Manager
//updates the manager of the employee with given id, and displays the updated list of all employees
const updateEmployeeManager = async(answer) =>{
    
    try{
        const id = answer.employeeToBeUpdatedForManager;
        const managerId = answer.employeeManagerToBeUpdated;
        const queryString = `UPDATE employee SET manager_id = ${managerId} WHERE id = ${id}`;
        
        await connection.query(queryString);
        console.log("\n");
        console.log(`${logSymbols.success}`, `\x1b[3;92mEmployee with id ${id}'s manager updated!\x1b[0m`);
        return await viewAllEmployees();
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- View By Given Manager
//displays a list of all employees who report to the manager with given id
const viewEmployeesByManager = async(answer) =>{
    const managerId = answer.manager;
    
    try{
        // |-- Manager Id --|-- Manager --|-- Employee --|-- Id --|
        const queryString = `SELECT mngr.id AS "Manager Id", CONCAT(mngr.first_name, " ", mngr.last_name) AS Manager, CONCAT(emp.first_name, " ", emp.last_name) AS Employee, emp.id AS  Id FROM employee AS emp  INNER JOIN employee AS mngr WHERE mngr.id = ${managerId} AND emp.manager_id=mngr.id `;
        
        const result = await connection.query(queryString);
        console.log("\n");
        console.table(result);
        console.log(`${logSymbols.success}`, `\x1b[3;92mEmployees under the Manager with id ${managerId} retrieved!\x1b[0m`);
        
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- View By Given Department
//displays a list of all employees whose roles belong to the department with given id
const viewEmployeesByDepartment = async(answer) =>{
    const departmentId = answer.department;
    
    try{
        // |-- Department Id --|-- Department --|-- Employee --|-- Employee Id--|
        const queryString = `SELECT dept.id AS "Department Id", dept.department_name AS Department, CONCAT(emp.first_name, " ", emp.last_name) AS Employee, emp.id AS "Employee Id" FROM department AS dept INNER JOIN role ON role.department_id= dept.id INNER JOIN employee AS emp  ON emp.role_id = role.id  WHERE dept.id = ${departmentId}`;
        
        const result = await connection.query(queryString);
        console.log("\n");
        console.table(result);
        console.log(`${logSymbols.success}`, `\x1b[3;92mEmployees under the Department with id ${departmentId} retrieved!\x1b[0m`);
        
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

module.exports = {getEmployees, viewAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole, updateEmployeeManager, getManagers, viewEmployeesByManager, viewEmployeesByDepartment};
