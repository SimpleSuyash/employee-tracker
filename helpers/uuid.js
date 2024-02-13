
// importing the connection to the database.
const pool = require("../config/db-connection").pool;
let ids =[];
//produces a random number between 1 to 100 
//ultimately returns a number that is not being used as an id in the given table
const getARandomId = (idFor)=>{
    return new Promise((resolve, reject) =>{
        // Returns a random integer from 1 to 100:
        let sql;
        // let aRandomId = Math.floor(Math.random()*100)+1;
        // console.log(`a random id ${aRandomId}`);
        if (idFor === "Department"){
            sql =`SELECT id FROM department`;
        }else if(idFor === "Role"){
            sql =`SELECT id FROM role`;
        }else{
            sql =`SELECT id FROM employee`;
        }
        
        pool.getConnection((err, connection) =>{
            if(err){
                res.status(500).json({error: err.message});
                return;
            }
            connection.query(sql, (err, result) =>{
                let aRandomId;
                if(err){
                    return err.message;
                }
                // console.log(result);
                ids = result.map(item=>{
                    return item.id;
                });

                do{
                    aRandomId = Math.floor(Math.random()*100)+1;
                    // console.log(aRandomId);
                }while(ids.includes(aRandomId));
                connection.release();
                // console.log(`finally ${aRandomId}`);
                resolve(aRandomId);
            });
        });
    });
};


module.exports = getARandomId;