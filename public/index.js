const inquirer = require('inquirer')

const initialQs = [
    {
        "type": "list",
        "prompt": "Select an action:",
        "name": "action",
        "choices": ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    }
]

const addDeptQs = [
    {
        "type": "input",
        "prompt": "What is the department's name?",
        "name": "deptName"
    }
]

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

inquirer
    .prompt(initialQs)
    .then()