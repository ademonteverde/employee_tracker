-- Insert data into the department table first
INSERT INTO department (department_name)
VALUES
    ('Finance'),
    ('Marketing'),
    ('Admin'),
    ('HR');

-- Insert data into the role table, ensuring that department_id values exist in the department table
INSERT INTO role (title, department_id, salary)
VALUES
    ('Accountant', 1, 64900),
    ('Personal Finance Advisor', 1, 100200),
    ('Marketing Director', 2, 78000),
    ('Marketing Coordinator', 2, 50000),
    ('Office managers', 3, 61000),
    ('Executive assistant', 3, 47000),
    ('Labor Relations Specialist', 4, 83000),
    ('Human Resources Coordinator', 4, 45000);

-- Insert data into the employee table, ensuring that role_id values exist in the role table
-- Insert data into the employee table with valid role_id values
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Marx', 'Richard', 1, 2),
    ('Chan', 'Karen', 2, NULL),
    ('Rodriguez', 'Samantha', 3, NULL),
    ('Doe', 'Bob', 4, 3),
    ('Song', 'Sierra', 5, 4),
    ('Jefferson', 'TJ', 6, NULL),
    ('Jackson', 'Michael', 7, NULL),
    ('Brown', 'Lourd', 8, 7);

