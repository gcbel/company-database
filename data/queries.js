/* DEPENDENCIES */
const inquirer = require('inquirer')
const {getDepartments, getRoles, getEmployees} = require('../helpers/utils.js')
const pool = require('../config/connection.js')
pool.connect();

/* PROMPTS */
/* Prompts for user action */
const actions = ["View all departments", "View all roles", "View all employees", "View employees by department", "Add a department", "Add a role", "Add an employee", "Update an employee", "Delete a department", "Delete a role", "Delete an employee"];
const actionQ = [
    {
        "type": "list", 
        "message": "Select an action:",
        "name": "action",
        "choices": actions
    }
]

/* Prompts user for another action */
const additionalActionQ = [
    {
        "type": "list",
        "message": "Would you like to select another action?",
        "name": "answer",
        "choices": ["Yes", "No"]
    }
]

/* Prompts for viewing employees by department */
const employeeByDeptQ = async () => {
    try {
        const depts = await getDepartments();  // Wait for depts to be fetched
        if (depts.length === 0) return [];     // Return an empty query if no depts have been added yet

        return [
            {
                "type": "list",
                "message": "What department's employees would you like to view?",
                "name": "dept",
                "choices": depts
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

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
        console.error(err);
        return []
    }
}

/* Prompts for adding a new employee */
const addEmployeeQ = async () => {
    try {
        const roles = await getRoles();       // Wait for roles to be fetched
        let managers = await getEmployees();  // Wait for employees to be fetched
        managers.unshift('0: None')           // Add an option for no manager

        // Return an empty query if no roles have been added yet
        if (roles.length === 0) return [];

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
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

/* Prompts for updating an employee */
const updateEmployeeQ = async () => {
    try {
        const employees = await getEmployees();  // Wait for employees to be fetched
        const roles = await getRoles();          // Wait for roles to be fetched

        // Return an empty query if no roles or employees have been added yet
        if (roles.length === 0) return [];
        if (employees.length === 0) return [];

        return [
            {
                "type": "list",
                "message": "What is the employee's name?",
                "name": "employeeName",
                "choices": employees
            },
            {
                "type": "list",
                "message": "What is the employee's new role?",
                "name": "employeeRole",
                "choices": roles
            },
            {
                "type": "list",
                "message": "Who is the employee's new manager?",
                "name": "employeeManager",
                "choices": employees
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

/* Prompts for removing a department */
const deleteDeptQ = async () => {
    try {
        const departments = await getDepartments();  // Wait for employees to be fetched
        if (departments.length === 0) return [];     // Return an empty query if no roles have been added yet

        return [
            {
                "type": "list",
                "message": "What department would you like to remove?",
                "name": "dept",
                "choices": departments
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

/* Prompts for removing an employee */
const deleteRoleQ = async () => {
    try {
        const roles = await getRoles();     // Wait for employees to be fetched
        if (roles.length === 0) return [];  // Return an empty query if no roles have been added yet

        return [
            {
                "type": "list",
                "message": "What role would you like to remove?",
                "name": "role",
                "choices": roles
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

/* Prompts for removing an employee */
const deleteEmployeeQ = async () => {
    try {
        const employees = await getEmployees();  // Wait for employees to be fetched
        if (employees.length === 0) return [];   // Return an empty query if employees have been added yet

        return [
            {
                "type": "list",
                "message": "What employee would you like to remove?",
                "name": "employee",
                "choices": employees
            }
        ]

    // Error checking
    } catch (err) {
        console.error(err);
        return []
    }
}

module.exports = {actionQ, additionalActionQ, employeeByDeptQ, addDeptQ, addRoleQ, addEmployeeQ, updateEmployeeQ, deleteDeptQ, deleteRoleQ, deleteEmployeeQ};