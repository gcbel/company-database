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

module.exports = pool;