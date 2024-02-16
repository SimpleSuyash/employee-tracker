/*
    Contains enum values of the main/menu/task question
    those questions are long, tedious and prone to typos
    also enum values helps to clearly see this app's use cases
*/


//the values will be used for main inquirer questions
const UseCases ={
    AllDepartments : "Department - View All",
    NewDepartment : "Department - Add New",
    DeleteDepartment : "Department - Delete",
    UtilizedBudget : "Department - View Utilized Budget",

    AllRoles : "Role - View All",
    NewRole : "Role - Add New",
    DeleteRole : "Role - Delete",

    AllEmployees : "Employee - View All",
    NewEmployee : "Employee - Add New",
    DeleteEmployee : "Employee - Delete",
    EmployeeNewRole: "Employee - Update Role",
    EmployeeNewManager : "Employee - Update Manager",
    EmployeesOfManager : "Employee - View By Manager",
    EmployeesOfDepartment : "Employee - View By Department",


}
module.exports = UseCases;