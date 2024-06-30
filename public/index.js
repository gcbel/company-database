const inquirer = require('inquirer')

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
        "type": "input",
        "prompt": "What department does the role fall under?",
        "name": "roleDept"
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
        "type": "input",
        "prompt": "Who is the employee's manager?",
        "name": "employeeManager"
    },
    {
        "type": "input",
        "prompt": "What department is the employee in?",
        "name": "employeeDept"
    }
]
