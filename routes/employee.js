const employee = require('express').Router();
// importing the connection to the database.
const connection = require("../helpers/db-connection").databaseConnection;
//Get route for retrieving all employees
employee.get("/", (req, res)=>{
    let sql = `SELECT e.id AS Id, concat(e.first_name, ' ', e.last_name) AS 'Employee Name', r.title AS 'Job Title', d.department_name AS Department, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM employee AS e LEFT JOIN employee AS m ON m.id = e.manager_id  
    LEFT JOIN role AS r ON e.role_id = r.id 
    LEFT JOIN department AS d ON r.department_id = d.id; `;
    connection.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send("All employees are extracted from the db!");
    });
    //need more coding here
    //res.json(JSON.parse(data))
});
//Get route for retrieving all employees under a given manager
employee.get("/:managerId", (req, res)=>{
    //need more coding here
    //res.json(JSON.parse(data))
});
//Get route for retrieving all employees within a given department
employee.get("/:departmentId", (req, res)=>{
    //need more coding here
    //res.json(JSON.parse(data))
});
//Post route for adding a new employee
employee.post("/",  (req, res)=>{
    //INSERT INTO employee VALUES( "first_name", "last_name","role", "manager");
});
//Put route for updating an employee's role
employee.put("/",  (req, res)=>{
    //UPDATE employee SET role_id = role_name WHERE id = given_id;
});
//Delete route for removing an employee
employee.delete("/:id", (req, res)=>{
    
});
//Get route for retrieving all managers
employee.get("/managers", (req, res)=>{
    let sql = `SELECT CONCAT(first_name, last_name) as manager FROM employee WHERE
        employee_id IN (SELECT UNIQUE manager_id FROM employee)`;
    connection.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send("All managers are extracted from the db!");
    });
    //need more coding here
    //res.json(JSON.parse(data))
});
connection.end((err => {
    if(err) throw err;
    console.log("Connection closed.");
}));
module.exports = employee;