/* DEPENDENCIES */
const inquirer = require('inquirer')

/* VARIABLES */
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"];
const functions = [viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee];

/* Prompts for user action */
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
const addDeptQs = [
    {
        "type": "input",
        "message": "What is the department's name?",
        "name": "deptName"
    }
]

/* Prompts for adding a new role */
const addRoleQs = [
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
        "choices": ["TO FIX"]
    }
]

/* Prompts for adding a new employee */
const addEmployeeQs = [
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
const updateEmployeeQs = [
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
/* Calls function for requested action */
function handleRequest(action) {
    const index = actions.findIndex(i => i == action.action);  // Get index of requested action
    functions[index]();
}

/* Calls function for requested action */
function handleAnotherRequest() {
    inquirer
        .prompt(additionalActionQ)
        .then((response) => {
            if (response.answer === "Yes") init()
            else {
                console.log("Thank you!");
                process.exit();
            }
        });
}

/* Fetch departments */
function viewDepts() {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    .then((response) => response.json())
    .then((data) => {
        console.log("Departments:");
        console.log(data);
        handleAnotherRequest();
    })
    .catch((err) => {
        console.error('Error:', err);
    });
}

/* Fetch roles */
function viewRoles () {
    fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    .then((response) => response.json())
    .then((data) => {
        console.log("Roles:");
        console.log(data);
        handleAnotherRequest();
    })
    .catch((err) => {
        console.error('Error:', err);
    });
}

/* Fetch employees */
function viewEmployees () {
    fetch('http://localhost:3001/api/employees', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })

    .then((response) => response.json())
    .then((data) => {
        console.log("Employees:");
        console.log(data);
        handleAnotherRequest();
    })
    .catch((err) => {
        console.error('Error:', err);
    });
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
/* Initialize call to message user to select an action */
function init() {
    inquirer
        .prompt(actionQ)
        .then((action) => handleRequest(action));
}

/* Function call to initialize app */
module.exports = init;