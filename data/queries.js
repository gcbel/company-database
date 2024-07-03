/* DEPENDENCIES */
const inquirer = require('inquirer')
const pool = require('../config/connection.js')
const {getDepartments, getEmployees, getRoles} = require('../helpers/utils.js')
pool.connect();

/* PROMPTS */
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
        
        // Return an empty query if no departments have been added yet
        if (departments.length === 0) return [];

        return [
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

    // Error checking
    } catch (err) {
        console.error(`${err}`);
        return []
    }
}

/* Prompts for adding a new employee */
const addEmployeeQ = async () => {
    try {
        const roles = await getRoles();              // Wait for roles to be fetched
        const managers = await getEmployees();       // Wait for employees to be fetched
        const departments = await getDepartments();  // Wait for departments to be fetched
        
        // Return an empty query if no departments have been added yet
        if (departments.length === 0) return [];

        return [
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
                "type": "list",
                "message": "What is the employee's role?",
                "name": "employeeRole",
                "choices": roles
            },
            {
                "type": "list",
                "message": "Who is the employee's manager?",
                "name": "employeeManager",
                "choices": managers
            },
            {
                "type": "list",
                "message": "What department is the employee in?",
                "name": "employeeDept",
                "choices": departments
            }
        ]

    // Error checking
    } catch (err) {
        console.error(`${err}`);
        return []
    }
}

/* Prompts for updating an employee */
const updateEmployeeQ = async () => {
    try {
        const employees = await getEmployees();  // Wait for employees to be fetched
        const roles = await getRoles();          // Wait for roles to be fetched

        return [
            {
                "type": "list",
                "message": "What is the employee's name?",
                "name": "employeeName",
                "choices": employees
            },
            {
                "type": "list",
                "message": "What is the employee's updated role?",
                "name": "employeeRole",
                "choices": roles
            }
        ]

    // Error checking
    } catch (err) {
        console.error(`${err}`);
        return []
    }
}

module.exports = {actionQ, additionalActionQ, addDeptQ, addRoleQ, addEmployeeQ, updateEmployeeQ};