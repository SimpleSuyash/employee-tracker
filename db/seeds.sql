-- Inserting data --
INSERT INTO department (id, department_name) VALUES
    (1, "Finance"),
    (2, "Account"),
    (3, "Marketing"),
    (4, "Administration"),
    (5, "IT"),
    (6, "Maintenance"),
    (7, "Human Resource"),
    (8, "Sales"),
    (9, "Reseach and Development");

INSERT INTO role(id, title, salary, department_id) VALUES
    (1, "Director", 150500.50, NULL),
    (2, "Manager", 120000.50, NULL),

    (3, "Financial Analyst", 79500.50, 1),
    (4, "Payroll Clerk", 69800.50, 1),
    
    (5, "Accountant", 74000.50, 2),

    (6, "Marketing Analyst", 80300.50, 3),
    (7, "Marketing Assistant", 66000, 3),

    (8, "Administrative Officer", 65500.00, 4),
    (9, "Receptionist", 62500.50, 4),

    (10, "Senior IT Chief", 97000, 5),
    (11, "IT Support", 75000.50, 5),

    (12, "Chief Engineer", 97500.50, 6),
    (13, "Houseman", 68000.50, 6),

    (14, "Talent Acquisition", 85000.25, 7),
    (15, "HR Specialist", 69000, 7),

    (16, "Sales Consultant", 88000.50, 8),
    (17, "Customer Service", 68400, 8),
    (18, "Sales Rep", 69000, 8),

    (19, "Product Designer", 72500.50, 9);
   
    

INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES
    (1, "Diane", "Murphe", 1, null),
    (2, "Jeff", "Firrelli", 2, 1),
    (3, "Mary", "Patterson", 3, 2),
    (4, "William", "Patterson", 4, 3),
    (5, "Gerard", "Bondur", 5, 2),
    (6, "Leslie", "Jennings", 6, 2),
    (7, "Foon Yue", "Tseng", 7, 6),
    (8, "Gerard", "Hernandez", 8, 2), 
    (9, "Peter", "Marsh", 9, 2), 
    (10, "Yoshimi", "Kato", 10, 2), 
    (11, "Tom", "King", 11, 10), 
    (12, "Gerard", "Martin", 12, 2),
    (13, "Barry", "Jones", 13, 12), 
    (14, "Pamela", "Castillo", 14, 2),
    (15, "Julie", "Firrelli", 15, 14), 
    (16, "Leslie", "Thompson", 16, 2), 
    (17, "Anthony", "Bow", 17, 16), 
    (18, "Barry", "Bott", 18, 16),
    (19, "George", "Vanauf", 19, 2),
    (20, "Keith", "Franco", 15, 14),
    (21, "Marie", "Veysel", 5, 2), 
    (22, "Isabel", "de Castro", 18, 16),
    (23, "Susan", "Nelson", 11, 10),
    (24, "Peter", "Ferguson", 9, 2),
    (25, "Martine", "Marsh", 8, 2),
    (26, "Julie", "King", 4, 3),
    (27, "Elis", "Marsh", 19, 2),
    (28, "Michael", "Frick", 15, 14),
    (29, "Susan", "King", 17, 16),
    (30,"Kelvin", "Leong", 7, 6);