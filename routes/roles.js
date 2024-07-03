/* DEPENDENCIES */
const roles = require('express').Router();

/* ROUTES */
roles.get('/', (req, res) => {
    pool.query('SELECT * FROM roles', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : res.json(rows);
    })
});

/* EXPORT */
module.exports = roles;