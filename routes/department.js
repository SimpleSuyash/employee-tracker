const department = require('express').Router();

//Getting route for retrieving all the departments
department.get("/", (req, res)=>{
    //need more coding here
    //res.json(JSON.parse(data))
    //SELECT id AS Id, department_name AS "Department Name" FROM department;
});

//Getting route for retrieving combined salaries of all employees
//in the given department
department.get("/:name", (req, res)=>{
    //need more coding here
    //res.json(JSON.parse(data))
    //SELECT d.department_name, SUM(r.salary) FROM department as d INNER JOIN r ON d.id = r.department_id INNER JOIN employee AS e ON r.id = e.role_id WHERE d.department_name = "Finance";
});

//Post route for adding a new department
department.post("/",  (req, res)=>{
    //INSERT INTO department (id, department_name) VALUES (10, "Legal");
});

//Delete route for removing a department
department.delete("/:id", (req, res)=>{
    //DELETE FROM department WHERE id = req.param.id;
});

module.exports = department;