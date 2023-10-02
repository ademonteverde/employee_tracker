const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const db = require("./db/connection");

require('dotenv').config();

async function startApp() {
    try {
        const dbInstance = await connectToDatabase();
        while (true) {
            await init(dbInstance);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "employee_db",
        });

        console.log("Connected to the employee database");

        const dbInstance = {
            query: async (sql, params) => {
                const [rows] = await connection.execute(sql, params);
                return rows;
            },
        };
        return dbInstance;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

module.exports = connectToDatabase;

async function viewAllDepartments(dbInstance) {
    try {
        const rows = await dbInstance.query("SELECT * FROM department");
        console.table(rows);
    } catch (error) {
        console.error("Error viewing departments:", error);
    }
}

async function viewAllDepartments(dbInstance) {
    try {
        const rows = await dbInstance.query("SELECT * FROM department");
        console.table(rows);
    } catch (error) {
        console.error("Error viewing departments:", error);
    }
}



async function viewAllRoles(dbInstance) {
    try {
        const rows = await dbInstance.query("SELECT * FROM role");
        console.table(rows);
    } catch (error) {
        console.error("Error viewing roles:", error);
    }
}

async function viewAllEmployees(dbInstance) {
    try {
        const rows = await dbInstance.query("SELECT * FROM employee");
        console.table(rows);
    } catch (error) {
        console.error("Error viewing employees:", error);
    }
}


async function addDepartment(dbInstance) {
    console.log('Add Department');
    try {
        const response = await inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "department_name",
            },
        ]);
        const dep_name = response.department_name;

        // Use the correct column name in your SQL query (department_name)
        await dbInstance.query("INSERT INTO department (department_name) VALUES (?)", [dep_name]);
        console.log(`Added ${dep_name} to the database`);
    } catch (error) {
        console.error("Error adding department:", error);
    }
}

async function addRole(dbInstance) {
    console.log("Add Role");
    try {
        const depResults = await dbInstance.query("SELECT * FROM department");
        const depNames = depResults.map((row) => row.department_name); // Use 'department_name' as the property name

        const response = await inquirer.prompt([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "title",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "salary",
            },
        ]);

        const department = await inquirer.prompt({
            type: "list",
            message: "Which department does the role belong to?",
            name: "department",
            choices: depNames,
        });

        const depIndex = depNames.indexOf(department.department);
        const department_id = depResults[depIndex].id; // Use depResults directly to get the department_id

        await dbInstance.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [
            response.title,
            parseFloat(response.salary),
            department_id,
        ]);
        console.log(`Added ${response.title} to the database`);
    } catch (error) {
        console.error("Error adding role:", error);
    }
}

async function addEmployee(dbInstance) {
    console.log("Add Employee");
    try {
        const names = await inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last_name',
            },
        ]);

        const rolesResults = await dbInstance.query("SELECT * FROM role");
        const roles = rolesResults.map((row) => row.title);
        const roleResponse = await inquirer.prompt({
            type: 'list',
            message: "What is the employee's role?",
            name: 'role',
            choices: roles,
        });

        const roleIndex = roles.indexOf(roleResponse.role);
        const role_id = rolesResults[roleIndex].id;

        // Filter out employees who are managers and have non-null names
        const managersResults = await dbInstance.query("SELECT * FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL) AND first_name IS NOT NULL AND last_name IS NOT NULL");
        const managers = managersResults.map((row) => row.first_name + ' ' + row.last_name);

        const managerResponse = await inquirer.prompt({
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: ['None', ...managers],
        });

        let manager_id = null;
        if (managerResponse.manager !== 'None') {
            const selectedManager = managersResults.find((manager) => `${manager.first_name} ${manager.last_name}` === managerResponse.manager);
            if (selectedManager) {
                manager_id = selectedManager.id;
            }
        }

        await dbInstance.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [
            names.first_name,
            names.last_name,
            role_id,
            manager_id,
        ]);

        console.log(`Added ${names.first_name} ${names.last_name} to the database`);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
}

async function updateEmployeeRole(dbInstance) {
    console.log("Update Employee Role");
    try {
        const employeesResults = await dbInstance.query("SELECT * FROM employee");
        const employees = employeesResults.map((row) => row.first_name + ' ' + row.last_name);
        const employeeResponse = await inquirer.prompt({
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'employee',
            choices: employees,
        });

        const employeeName = employeeResponse.employee;
        const employeeIndex = employees.indexOf(employeeName);

        const rolesResults = await dbInstance.query("SELECT * FROM role");
        const roles = rolesResults.map((row) => row.title);
        const roleResponse = await inquirer.prompt({
            type: 'list',
            message: `Which role do you want to assign ${employeeName}?`,
            name: 'role',
            choices: roles,
        });

        const roleName = roleResponse.role;
        const roleIndex = roles.indexOf(roleName);
        const role_id = rolesResults[roleIndex].id;

        // Update the employee's role in the database
        await dbInstance.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [role_id, employeeName.split(' ')[0]]);
        console.log(`Updated ${employeeName}'s role to ${roleName}`);
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
}

async function init() {
    try {
        const dbInstance = await connectToDatabase();
        const choices = [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
        ];

        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: choices,
            },
        ]);

        switch (action) {
            case choices[0]:
                await viewAllDepartments(dbInstance);
                break;
            case choices[1]:
                await viewAllRoles(dbInstance);
                break;
            case choices[2]:
                await viewAllEmployees(dbInstance);
                break;
            case choices[3]:
                await addDepartment(dbInstance);
                break;
            case choices[4]:
                await addRole(dbInstance);
                break;
            case choices[5]:
                await addEmployee(dbInstance);
                break;
            case choices[6]:
                await updateEmployeeRole(dbInstance);
                break;
            case choices[7]:
                process.exit()
        } 
        await init(dbInstance);
    } catch (error) {
        console.error("Error:", error);
    }
}

startApp();