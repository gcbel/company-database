/* DEPENDENCIES */
const inquirer = require('inquirer')
const pool = require('./config/connection.js')
pool.connect();

/* VARIABLES */
const {actionQ, additionalActionQ, addDeptQ, addRoleQ, addEmployeeQ, updateEmployeeQ} = require('./data/queries')
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"];
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
                console.log("Have a good day!");
                process.exit();
            }
        });
}

/* Fetch departments */
function viewDepts() {
    // Get table with all employee information
    pool.query('SELECT * FROM departments', function (err, {rows}) {
        if (err) console.err(`Error: ${err}`)
        if (rows.length === 0) {
            console.log("No departments.");
            handleAnotherRequest();
        } else {
            console.log("Departments:");
            console.table(rows);
            handleAnotherRequest();
        }
    })
}

/* Fetch roles */
function viewRoles () {
    // Check first if any roles
    pool.query('SELECT * FROM roles', function (err, {rows}) {
        if (err) console.err(`Error: ${err}`)

        // If no roles, alert user
        if (rows.length === 0) {
            console.log("No roles.");
            handleAnotherRequest();

        // Get table with all role information
        } else {
            query = `SELECT roles.id, title, salary, department_name AS department 
            FROM roles JOIN departments ON department_id = departments.id`

            pool.query(query, function (err, {rows}) {
                if (err) console.err(`Error: ${err}`)
                else {
                    console.log("Roles:");
                    console.table(rows);
                    handleAnotherRequest();
                }
            })
        }
    })
}

/* Fetch employees */
function viewEmployees () {
    // Check first if any employees
    pool.query('SELECT * FROM employees', function (err, {rows}) {
        if (err) console.err(`Error: ${err}`) 

        // If no employees, alert user
        if (rows.length === 0) {
            console.log("No employees.");
            handleAnotherRequest();

        // Get table with all employee information
        } else {
            query = `SELECT employees.id, employees.first AS first_name, employees.last AS last_name, 
            roles.title AS role, roles.salary, department_name AS department, CONCAT(manager.first, ' ', manager.last) AS manager
            FROM employees JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees manager ON employees.manager_id = manager.id;`

            pool.query(query, function (err, {rows}) {
                if (err) console.err(`Error: ${err}`) 
                else {
                    console.log("Employees:");
                    console.table(rows);
                    handleAnotherRequest();
                }
            })
        }
    })
}

/* Add new department */
function addDept () {
    inquirer
        .prompt(addDeptQ)
        .then((response) => {
            const query = 'INSERT INTO departments(department_name) VALUES ($1)';

            pool.query(query, [response.deptName], (err, result) => {
                if (err) console.error(`${err}`)
                else {
                    console.log("Department added!");
                    handleAnotherRequest();
                }
            })
        });
}

/* Add a new role */
async function addRole () {
    try {
        // Get questions for user
        const queries = await addRoleQ()

        // Alert user if no departments have been added yet
        if (queries.length === 0) {
            console.log("Please add a department first!");
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [deptId] = response.roleDept.split(': ');  // Parse department id
                const responses = [response.roleName, parseFloat(response.roleSalary), deptId]
                const query = 'INSERT INTO roles(title, salary, department_id) VALUES ($1, $2, $3)';

                pool.query(query, responses, (err, result) => {
                    if (err) console.error(`${err}`) 
                    else {
                        console.log("Role added!");
                        handleAnotherRequest();
                    }
                })
            });

    // Error checking
    } catch (err) {
        console.error(`${err}`);
    }
}

/* Add a new role */
async function addEmployee () {
    try {
        // Get questions for user
        const queries = await addEmployeeQ()

        console.log(queries)

        // Alert user if no roles have been added yet
        if (queries.length === 0) {
            console.log("Please add a role first!");
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [roleId] = response.employeeRole.split(': ');        // Parse role id
                const [managerId] = response.employeeManager.split(': ');  // Parse manager id

                // If no manager selected, set manager to null
                let responses = [response.employeeFirst, response.employeeLast, roleId, managerId]
                if (managerId === "0") responses[3] = null

                const query = 'INSERT INTO employees(first, last, role_id, manager_id) VALUES ($1, $2, $3, $4)';
            
                pool.query(query, responses, (err, result) => {
                    if (err) console.error(`${err}`)
                    else {
                        console.log("Employee added!");
                        handleAnotherRequest();
                    }
                })
            });

    // Error checking
    } catch (err) {
        console.error(`${err}`);
    }

}

async function updateEmployee () {
    try {
        // Get questions for user
        const queries = await updateEmployeeQ()

        // Alert user if no roles have been added yet
        if (queries.length === 0) {
            console.log("Please adds role and employees first!");
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [employeeId] = response.employeeName.split(': ');    // Parse employee id
                const [roleId] = response.employeeRole.split(': ');        // Parse role id
                const [managerId] = response.employeeManager.split(': ');  // Parse manager id

                // If no manager selected, set manager to null
                let responses = [roleId, managerId, employeeId];
                if (managerId === "0") responses[1] = null;
                const query = 'UPDATE employees SET role_id = $1, manager_id = $2 WHERE id = $3';
            
                pool.query(query, responses, (err, result) => {
                    if (err) console.error(`${err}`)
                    else {
                        console.log("Employee updated!");
                        handleAnotherRequest();
                    }
                })
            });

    // Error checking
    } catch (err) {
        console.error(`${err}`);
    }
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