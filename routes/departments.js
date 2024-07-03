/* DEPENDENCIES */
const depts = require('express').Router();

/* ROUTES */
depts.get('/', (req, res) => {
    console.log(`Get request received for /api/notes`)
    pool.query('SELECT * FROM departments', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
});

/* EXPORT */
module.exports = depts;