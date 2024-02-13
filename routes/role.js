const role = require('express').Router();
// importing the connection to the database.
const pool = require("../config/db-connection").pool;
//importing help function to create id
const getARandomId = require("../helpers/uuid");

//Getting route for retrieving all roles
role.get("/", (req, res)=>{
    const sql = `SELECT r.id AS Id, r.title AS "Job Title", d.department_name AS Department, r.salary FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id`; 
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


//Post route for adding a new role
role.post("/",  async (req, res)=>{
    const sql = `INSERT INTO role VALUES(?, ?, ?, ?)`;
    const title = req.body.title;
    const salary = req.body.salary;
    const departmentId = req.body.department_id;
    let aRandomId;
    try{
        aRandomId = await getARandomId("Role");
    }catch(error){
        console.log(error);
    }
    console.log(aRandomId);
    if(title && aRandomId){
    
        pool.getConnection((err, connection) =>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            connection.query(sql, [aRandomId, title, salary, departmentId], (err, result) =>{
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
        res.status(500).json('Error in adding the role');
    }
});
//Delete route for removing an role
role.delete("/:id", (req, res)=>{
    const sql = `DELETE FROM role WHERE id = ?`;
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
                    message: 'Role not found'
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

module.exports = role;