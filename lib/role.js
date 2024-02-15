// importing the connection to the database.
const connection = require("../config/db-connection");
//importing help function to create id
const getARandomId = require("../helpers/uuid");
const showPrompts = require("./index");
//Colored symbols for various log levels
//includes info, success, warning and error
const logSymbols = require("log-symbols");


//----------------------------------Get All
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
const viewAllRoles = async() =>{
    try{
        const queryString =`SELECT r.id AS Id, r.title AS "Job Title", d.department_name AS Department, r.salary AS Salary FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id`;
        const result = await connection.query(queryString);
        console.log("\n");
        console.table(result);
        // return showPrompts;
    }catch(error){
        console.error(`${logSymbols.error}`, `\x1b[3;31m${error}\x1b[0m`);
    }
};

//---------------------------------- Add New
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
/*



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
*/
module.exports = {getRoles, viewAllRoles, addNewRole, deleteRole};