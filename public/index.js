/* DEPENDENCIES */
const inquirer = require('inquirer')
import {view} from "./utils/generateMarkdown.js";

/* VARIABLES */
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"];
const functions = [viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee];

/* Prompts for user action */
const actionQs = [
    {
        "type": "list",
        "prompt": "Select an action:",
        "name": "action",
        "choices": actions
    }
]

/* Prompts for adding a new department */
const addDeptQs = [
    {
        "type": "input",
        "prompt": "What is the department's name?",
        "name": "deptName"
    }
]

/* Prompts for adding a new role */
const addRoleQs = [
    {
        "type": "input",
        "prompt": "What is the role's title?",
        "name": "roleName"
    },
    {
        "type": "input",
        "prompt": "What is the salary of the role?",
        "name": "roleSalary"
    },
    {
        "type": "list",
        "prompt": "What department does the role fall under?",
        "name": "roleDept",
        "choices": ["TO FIX"]
    }
]

/* Prompts for adding a new employee */
const addEmployeeQs = [
    {
        "type": "input",
        "prompt": "What is the employee's first name?",
        "name": "employeeFirst"
    },
    {
        "type": "input",
        "prompt": "What is the employee's last name?",
        "name": "employeeLast"
    },
    {
        "type": "input",
        "prompt": "What is the employee's role?",
        "name": "employeeRole"
    },
    {
        "type": "list",
        "prompt": "Who is the employee's manager?",
        "name": "employeeManager",
        "choices": ["TO FIX"]
    },
    {
        "type": "list",
        "prompt": "What department is the employee in?",
        "name": "employeeDept",
        "choices": ["TO FIX"]
    }
]

/* Prompts for updating an employee */
const updateEmployeeQs = [
    {
        "type": "list",
        "prompt": "What is the employee's name?",
        "name": "employeeName",
        "choices": ["TO FIX"]
    },
    {
        "type": "list",
        "prompt": "What is the employee's updated role?",
        "name": "employeeRole",
        "choices": ["TO FIX"]
    }
]

/* FUNCTIONS */
function handleRequest(action) {
    const index = actions.findIndex(i => i == action)  // Get index of requested action
    functions[index]  // Call function for requested action
}

function viewDepts() {

}

function viewRoles () {

}

function viewEmployees () {

}

function viewRoles () {

} 

function addDept () {

}

function addRole () {

}

function addEmployee () {

}

function updateEmployee () {
    inquirer
        .prompt(updateEmployeeQs)
        // .then((responses) => ...(responses));
}

/* INITIALIZERS */
/* Initialize call to prompt user to select an action */
function init() {
    inquirer
        .prompt(actionQs)
        .then((action) => handleRequest(action));
}

/* Function call to initialize app */
init();