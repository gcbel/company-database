/* DEPENDENCIES */
const employees = require('express').Router();

/* ROUTES */
employees.get('/', (req, res) => {
    pool.query('SELECT * FROM employees', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
});

/* EXPORT */
module.exports = employees;