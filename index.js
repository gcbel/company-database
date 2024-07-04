/* DEPENDENCIES */
const inquirer = require('inquirer')
const pool = require('./config/connection.js')
pool.connect();

/* VARIABLES */
const {actionQ, additionalActionQ, addDeptQ, addRoleQ, addEmployeeQ, updateEmployeeQ, deleteDeptQ, deleteRoleQ, deleteEmployeeQ} = require('./data/queries')
const actions = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "Delete a department", "Delete a role", "Delete an employee"];
const functions = [viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee, deleteDept, deleteRole, deleteEmployee];

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
        if (rows.length === 0) {
            console.log("No roles.");  // If no roles, alert user
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
        if (rows.length === 0) {
            console.log("No employees.");  // If no employees, alert user
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
                if (err) console.error(err)
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
        const queries = await addRoleQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please add a department first!");  // Alert user if no departments have been added yet
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
                    if (err) console.error(err) 
                    else {
                        console.log("Role added!");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) {console.error(err)}  // Error checking
}

/* Add a new role */
async function addEmployee () {
    try {
        const queries = await addEmployeeQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please add a role first!");  // Alert user if no roles have been added yet
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [roleId] = response.employeeRole.split(': ');        // Parse role id
                const [managerId] = response.employeeManager.split(': ');  // Parse manager id

                let responses = [response.employeeFirst, response.employeeLast, roleId, managerId]
                if (managerId === "0") responses[3] = null  // If no manager selected, set manager to null

                const query = 'INSERT INTO employees(first, last, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                pool.query(query, responses, (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log("Employee added!");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) { console.error(err)}  // Error checking

}

async function updateEmployee () {
    try {
        const queries = await updateEmployeeQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please adds role and employees first!");  // Alert user if no roles have been added yet
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

                let responses = [roleId, managerId, employeeId]
                if (managerId === "0") responses[1] = null;  // If no manager selected, set manager to null

                const query = 'UPDATE employees SET role_id = $1, manager_id = $2 WHERE id = $3';
                pool.query(query, responses, (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log("Employee updated!");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) {console.error(err)}  // Error checking
}

async function deleteEmployee() {
    try {
        const queries = await deleteEmployeeQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please add employees first!");  // Alert user if no employees have been added yet
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [employeeId] = response.employee.split(': ');  // Parse employee id
                pool.query('DELETE FROM employees WHERE id = $1', [employeeId], (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log("Employee deleted.");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) {console.error(err)};  // Error checking
}

async function deleteRole() {
    try {
        const queries = await deleteRoleQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please add roles first!");  // Alert user if no roles have been added yet
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [roleId] = response.role.split(': ');  // Parse role id
                pool.query('DELETE FROM roles WHERE id = $1', [roleId], (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log("Role deleted.");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) {console.error(err)};  // Error checking
}

/* Delete department */
async function deleteDept() {
    try {
        const queries = await deleteDeptQ()  // Get questions for user
        if (queries.length === 0) {
            console.log("Please add departments first!");  // Alert user if no depts have been added yet
            handleAnotherRequest();
            return;
        }

        // Prompt user with questions
        inquirer
            .prompt(queries)
            .then((response) => {
                const [deptId] = response.dept.split(': ');  // Parse dept id
                pool.query('DELETE FROM departments WHERE id = $1', [deptId], (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log("Department deleted.");
                        handleAnotherRequest();
                    }
                })
            });

    } catch (err) {console.error(err)};  // Error checking
}

/* INITIALIZERS */
/* Initialize call to message user to select an action */
function init() {
    inquirer
        .prompt(actionQ)
        .then((action) => handleRequest(action));
}

init();