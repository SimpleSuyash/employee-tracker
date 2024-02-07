const {validateId, validateName} = require("./validations");

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

module.exports = Employee;