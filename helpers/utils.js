/* DEPENDENCIES */
const pool = require('../config/connection.js')
pool.connect();

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

/* Return all employees in an array in the format [id: first last, id2: first2 last2] */
async function getEmployees() {
    try {
        const {rows} = await pool.query('SELECT * FROM employees') 
        result = [];
        rows.forEach(row => result.push(`${row.id}: ${row.first} ${row.last}`));
        return result;
    } catch (err) {
        console.error(err);
        return [];  // In case of error, return empty array
    }
}

/* Return all roles in an array in the format [id: title, id2: title] */
async function getRoles() {
    try {
        const {rows} = await pool.query('SELECT * FROM roles') 
        result = [];
        rows.forEach(row => result.push(`${row.id}: ${row.title}`));
        return result;
    } catch (err) {
        console.error(err);
        return [];  // In case of error, return empty array
    }
}

module.exports = {getDepartments, getEmployees, getRoles}