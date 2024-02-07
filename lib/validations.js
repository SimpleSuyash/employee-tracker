const validateId = id =>{
   switch(true){
        case (id === null):
            throw new Error("Invalid Id: Null value is received!");
        case (id === undefined):
            throw new Error("Invalid Id: Value is not defined!");
        case (!Number.isInteger(id)):
            throw new Error("Invalid Id: Non-integer value is received!");
        case (id < 1) :
            throw new Error("Invalid Id: Invalid id value is received!");
        default:
            return id;
   }
};
const validateName = name =>{
    switch(true){
        case (name === null):
            throw new Error("Invalid Value: Null value is received!");
        case (name === undefined):
            throw new Error("Invalid Value: Value is not defined!");
        case (typeof name !== "string"):
            throw new Error("Invalid Value: Value is not a string!");
        case (name.trim() === ""):
            throw new Error("Invalid Value: Empty value is received!");
        default:
            return name.trim();
    }
};

const validateSalary = salary =>{
    switch(true){
        case (salary === null):
            throw new Error("Invalid Salary: Null value is received!");
        case (salary === undefined):
            throw new Error("Invalid Salary: Value is not defined!");
        case (!Number.isInteger(salary)):
            throw new Error("Invalid Salary: Non-number value is received!");
        case (salary < 0) :
            throw new Error("Invalid Salary: Negative Salary Value is received!");
        default:
            return salary;
   }
};
 

module.exports = {validateId, validateName, validateSalary};
