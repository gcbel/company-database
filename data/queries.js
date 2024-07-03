/* DEPENDENCIES */
const inquirer = require('inquirer')
const pool = require('../config/connection.js')
pool.connect();

/* VARIABLES */
/* Prompts for user action */
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"];
const actionQ = [
    {
        "type": "list",
        "message": "Select an action:",
        "name": "action",
        "choices": actions
    }
]

/* Prompts for user for another action */
const additionalActionQ = [
    {
        "type": "list",
        "message": "Would you like to select another action?",
        "name": "answer",
        "choices": ["Yes", "No"]
    }
]

/* Prompts for adding a new department */
const addDeptQ = [
    {
        "type": "input",
        "message": "What is the department's name?",
        "name": "deptName"
    }
]

/* Prompts for adding a new role */
const addRoleQ = async () => {
    try {
        const departments = await getDepartments();  // Wait for departments to be fetched
        const queries = [
            {
                "type": "input",
                "message": "What is the role's title?",
                "name": "roleName"
            },
            {
                "type": "input",
                "message": "What is the salary of the role?",
                "name": "roleSalary"
            },
            {
                "type": "list",
                "message": "What department does the role fall under?",
                "name": "roleDept",
                "choices": departments
            }
        ]
        return queries;
    } catch (err) {
        console.error(`${err}`);
    }
}

/* Prompts for adding a new employee */
const addEmployeeQ = [
    {
        "type": "input",
        "message": "What is the employee's first name?",
        "name": "employeeFirst"
    },
    {
        "type": "input",
        "message": "What is the employee's last name?",
        "name": "employeeLast"
    },
    {
        "type": "input",
        "message": "What is the employee's role?",
        "name": "employeeRole"
    },
    {
        "type": "list",
        "message": "Who is the employee's manager?",
        "name": "employeeManager",
        "choices": ["TO FIX"]
    },
    {
        "type": "list",
        "message": "What department is the employee in?",
        "name": "employeeDept",
        "choices": ["TO FIX"]
    }
]

/* Prompts for updating an employee */
const updateEmployeeQ = [
    {
        "type": "list",
        "message": "What is the employee's name?",
        "name": "employeeName",
        "choices": ["TO FIX"]
    },
    {
        "type": "list",
        "message": "What is the employee's updated role?",
        "name": "employeeRole",
        "choices": ["TO FIX"]
    }
]

/* FUNCTIONS */
/* Return all departments in an array in the format [id: name, id2: name2] */
async function getDepartments() {
    try {
        const {rows} = await pool.query('SELECT * FROM departments') 
        result = [];
        rows.forEach(row => result.push(`${row.id}: ${row.name}`));
        return result;
    } catch (err) {
        console.error(err);
        return [];  // In case of error, return empty array
    }
}

module.exports = {actionQ, additionalActionQ, addDeptQ, addRoleQ, addEmployeeQ};