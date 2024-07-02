/* DEPENDENCIES */
const express = require('express');
const {pool} = require('pg');

/* VARIABLES */
const PORT = process.env.PORT || 3001;
const app = express();

/* MIDDLEWARE */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

/* ROUTES */
/* Get route to see all departments */
app.get('/api/departments', (res, req) => {
    pool.query('SELECT * FROM departments', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : console.log(rows);
    })
});

/* Get route to see all roles */
app.get('/api/roles', (res, req) => {
    pool.query('SELECT * FROM roles', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : console.log(rows);
    })
});

/* Get route to see all employees */
app.get('/api/employees', (res, req) => {
    pool.query('SELECT * FROM employees', function (err, {rows}) {
        err ? console.err(`Error: ${err}`) : console.log(rows);
    })
});

/* PORT */
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});