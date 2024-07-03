/* DEPENDENCIES */
const inquirer = require('inquirer')
const {Pool} = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: 'pw',
      host: 'localhost',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
)

pool.connect();

/* VARIABLES */
const {actionQ, additionalActionQ, addDeptQ, addRoleQ, addEmployeeQ} = require('./data/queries')
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"];
const functions = [viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee];

/* FUNCTIONS */
/* Calls function for requested action */
function handleRequest(action) {
    const index = actions.findIndex(i => i == action.action);  // Get index of requested action
    functions[index]();
}

/* Prompts users for whether they want to continue */
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
    pool.query('SELECT * FROM departments', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
}

/* Fetch roles */
function viewRoles () {
    pool.query('SELECT * FROM roles', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
}

/* Fetch employees */
function viewEmployees () {
    pool.query('SELECT * FROM employees', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
}

/* Add new department */
function addDept () {
    inquirer
        .prompt(addDeptQ)
        .then((response) => {
            const query = 'INSERT INTO departments(name) VALUES ($1)';

            pool.query(query, [response.deptName], (err, result) => {
                 err ? console.error(`${err}`) : console.log("Department added!");
            })
        });
}

function addRole () {
    inquirer
        .prompt(addRoleQ)
        .then((response) => {
            const responses = [response.roleName, response.roleSalary, response.roleDept]
            const query = 'INSERT INTO roles(title, salary, dept_id) VALUES ($1, $2, $3)';

            pool.query(query, responses, (err, result) => {
                err ? console.error(`${err}`) : console.log("Role added!");
            })
        });
}

function addEmployee () {
    inquirer
        .prompt(addEmployeeQ)
        .then((response) => {
            const responses = [response.employeeFirst, response.employeeLast, response.employeeRole, response.employeeManager, response.employeeDept]
            const query = 'INSERT INTO employees(first, last, manager_id, role_id) VALUES ($1, $2, $3, $4, $5)';
        
            pool.query(query, responses, (err, result) => {
                 err ? console.error(`${err}`) : console.log("Employee added!");
            })
        });
}

function updateEmployee () {
    inquirer
        .prompt(updateEmployeeQ)
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
init();