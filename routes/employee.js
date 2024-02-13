const employee = require('express').Router();
// importing the connection to the database.
const pool = require("../config/db-connection").pool;
//importing help function to create id
const getARandomId = require("../helpers/uuid");

//Get route for retrieving all employees
employee.get("/", (req, res)=>{
    const sql = `SELECT e.id AS Id, CONCAT(e.first_name, ' ', e.last_name) AS Employee, r.title AS 'Job Title', d.department_name AS Department, r.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) as Manager FROM employee AS e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id `;

    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            
            res.json({
                message: 'Success', 
                data: result
            });
            connection.release();
        });
    });
});
//Get route for retrieving all employees under a given manager
employee.get("/manager/", (req, res)=>{
    const sql = `SELECT  CONCAT(mngr.first_name, " ", mngr.last_name) AS Manager, CONCAT(emp.first_name, " ", emp.last_name) AS Employee, emp.id AS "Employee Id" FROM employee AS emp  INNER JOIN employee AS mngr WHERE mngr.id = ? AND emp.manager_id=mngr.id`;
    const param = req.query.managerId;
    // console.log(param);
    
    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, [param], (err, result) =>{
            if(err){
                res.status(400).json({error: err.message});
            }else  {
                res.json({
                    message: 'success',
                    data: result
                });
                connection.release();
            }
        });
    });
});
//Get route for retrieving all employees within a given department
employee.get("/department/", (req, res)=>{
    const sql = `SELECT dept.department_name AS Department, CONCAT(emp.first_name, " ", emp.last_name) AS Employee, emp.id AS "Employee Id" FROM department AS dept INNER JOIN role ON role.department_id= dept.id INNER JOIN employee AS emp  ON emp.role_id = role.id  WHERE dept.id = ?`;
    const param = req.query.departmentId;
    // console.log(param);
    
    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, [param], (err, result) =>{
            if(err){
                res.status(400).json({error: err.message});
            }else  {
                res.json({
                    message: 'success',
                    data: result
                });
                connection.release();
            }
        });
    });
});

//Post route for adding a new employee
employee.post("/",  async (req, res)=>{
    const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ? , ?, ?, ?)`;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const roleId = req.body.role_id;
    const managerId = req.body.manager_id;


    let aRandomId;
    try{
        aRandomId = await getARandomId("Employee");
    }catch(error){
        console.log(error);
    }

    if(firstName && lastName){
    
        pool.getConnection((err, connection) =>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            connection.query(sql, [aRandomId, firstName, lastName, roleId, managerId], (err, result) =>{
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                res.json({
                    message: 'success',
                    data: req.body
                });
                connection.release();
            });
        });
    }else{
        res.status(500).json('Error in adding the employee');
    }
});
//Put route for updating an employee's role
employee.put("/:id",  (req, res)=>{
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const roleId = req.body.role_id;
    const employeeId = req.params.id;
    
    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, [roleId, employeeId], (err, result) =>{
            if (err) {
                res.status(400).json({ error: err.message });
                
            }else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                });
            } else {
                res.json({
                    message: 'success',
                    data: req.body,
                    changes: result.affectedRows
                });
            }
            connection.release();
        });
    });
});
//Delete route for removing an employee
employee.delete("/:id", (req, res)=>{
    const sql = `DELETE FROM employee WHERE id = ?`;
    const param = req.params.id;
    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, [param], (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                });
            } else {
                res.json({
                    message: 'deleted',
                    changes: result.affectedRows,
                    id: req.params.id
                });
            }
            connection.release();
        });
    });
});
//Get route for retrieving all managers
employee.get("/managers", (req, res)=>{
    let sql = `SELECT id as Id, CONCAT(first_name, " ", last_name) as Manager FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee)`;
    // let sql = `SELECT DISTINCT mngr.id, CONCAT(mngr.first_name, " ", mngr.last_name) AS Manager FROM employee AS emp  INNER JOIN employee AS mngr ON emp.manager_id=mngr.id`;

    pool.getConnection((err, connection) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        connection.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            
            res.json({
                message: 'Success', 
                data: result
            });
            connection.release();
        });
    });
});

module.exports = employee;