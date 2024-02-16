
--  deleting the my-company_db, in any exists
DROP DATABASE IF EXISTS my_company_db;
-- Createing the my-company_db database
CREATE DATABASE my_company_db;
--  Switch to the employee_db database
USE my_company_db;

-- Creating department table
CREATE TABLE department(
    id INT UNIQUE NOT NULL CHECK (id > 0),
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating role table
CREATE TABLE role(
    id INT UNIQUE NOT NULL CHECK (id > 0),
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) DEFAULT 0  CHECK(salary >= 0),
    department_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL
);

-- creating employee table
CREATE TABLE employee(
    id INT UNIQUE NOT NULL CHECK (id > 0),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT DEFAULT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE SET NULL
);

