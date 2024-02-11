const role = require('express').Router();

//Getting route for retrieving all roles
role.get("/", (req, res)=>{
    //need more coding here
    //res.json(JSON.parse(data))
    //SELECT r.id AS Id, r.title AS "Job Title", d.department_name AS Department, r.salary FROM role AS r INNER JOIN department AS d ON d.id = r.department_id; 
});


//Post route for adding a new role
role.post("/",  (req, res)=>{
    //INSERT INTO role VALUES(20, "Lawyer", 0, null);
});
//Delete route for removing an role
role.delete("/:id", (req, res)=>{
    
});

module.exports = role;