const mysql = require('mysql')

const config = {
  host: 'localhost',
  user: 'scream_cha',
  password: 'scream_cha',
  database: 'dictionary',
  charset: 'utf8'
}

const connection = mysql.createConnection(config)

connection.connect((err) => {
  console.log('Database is connected.')
})

module.exports = connection