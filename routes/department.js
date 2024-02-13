const department = require('express').Router();
// importing the connection to the database.
const pool = require("../config/db-connection").pool;
//importing help function to create id
const getARandomId = require("../helpers/uuid");


//Getting route for retrieving all the departments
department.get("/", (req, res)=>{
    const sql =`SELECT id AS Id, department_name AS "Department Name" FROM department`;
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

//Getting route for retrieving combined salaries of all employees
//in the given department
department.get("/:name", (req, res)=>{
    const sql = `SELECT d.department_name as Department, SUM(r.salary) AS "Utilized Budget" FROM department AS d INNER JOIN role as r ON d.id = r.department_id INNER JOIN employee AS e ON r.id = e.role_id WHERE d.department_name = ?`;
    const param = req.params.name;
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

//Post route for adding a new department
department.post("/", async (req, res)=>{
    const sql = `INSERT INTO department (id, department_name) VALUES (?, ?)`;
    const departmentName = req.body.department_name;
    let aRandomId;
    try{
        aRandomId = await getARandomId("Department");
    }catch(error){
        console.log(error);
    }

    if(departmentName && aRandomId){
    
        pool.getConnection((err, connection) =>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            connection.query(sql, [aRandomId, departmentName], (err, result) =>{
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
        res.status(500).json('Error in adding the department');
    }
});

//Delete route for removing a department
department.delete("/:id", (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
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
                    message: 'Department not found'
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

module.exports = department;