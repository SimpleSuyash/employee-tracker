const {validateId, validateName, validateSalary} = require("./validations");

//creating Department Class
class Department {
    constructor(id, departmentName){
        const validId = validateId(id);
        const validName = validateName(departmentName);
        this.id = validId;
        this.departmentName = validName;
    }
}

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

//creating Employee Class
class Employee {
    constructor(id, firstName, lastName){

        const validId = validateId(id);
        const validFirstName = validateName(firstName);
        const validLastName = validateName(lastName);

        this.id = validId;
        this.firstName = validFirstName;
        this.lastName = validLastName;
        this.roleId = null;
        this.managerId = null;
    }

    //defining a method to set role
    setRole(roleId){
        const validId = validateId(roleId);
        this.roleId = validId;
    }
    //defining a method to set manager
    setRole(managerId){
        const validId = validateId(managerId);
        this.managerId = validId;
    }
}


module.exports = {Department, Role, Employee};