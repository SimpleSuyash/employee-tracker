const {validateId, validateName, validateSalary} = require("./validations");

//creating Role Class
class Role {
    constructor(id, title, salary){

        const validId = validateId(id);
        const validTitle = validateName(title);

        this.id = validId;
        this.title = validTitle;
        this.salary = 0;
        this.departmentId = null;
    }

    //defining a method to set salary
    setSalary(salary){
        const validSalary = validateSalary(salary);
        this.salary=validSalary;
    }
    //defining a method to set department
    setDepartment(departmentId){
        const validId = validateId(departmentId);
        this.departmentId = validId;
    }
}

module.exports = Role;