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
      database: 'movies_db'
    },
    console.log(`Connected to the books_db database.`)
)

pool.connect();

/* ROUTES */
app.get('/api/')

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});