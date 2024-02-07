const {validateId, validateName} = require("./validations");

//creating Department Class
class Department {
    constructor(id, departmentName){
        const validId = validateId(id);
        const validName = validateName(departmentName);
        this.id = validId;
        this.departmentName = validName;
    }
}

module.exports= Department;