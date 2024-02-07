
-- Createing the employee_db database 
CREATE DATABASE IF NOT EXISTS employee_db;
--  Switch to the employee_db database
USE employee_db;

-- Dropping existing tables
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- Creating department table
CREATE TABLE department(
    id INT NOT NULL CHECK (id > 0),
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating role table
CREATE TABLE role(
    id INT NOT NULL CHECK (id > 0),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) DEFAULT 0,
    department_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

-- creating employee table
CREATE TABLE employee(
    id INT NOT NULL CHECK (id > 0),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT DEFAULT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id),
    FOREIGN KEY (officeCode) REFERENCES offices (officeCode)
);

