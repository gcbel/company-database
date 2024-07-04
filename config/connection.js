const {Pool} = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: 'pw',
      host: 'localhost',
      database: 'company_db'
    },
    console.log(`Connected to the company database.`)
)

module.exports = pool;