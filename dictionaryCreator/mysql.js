const mysql = require('mysql')

const config = {
  host: 'localhost',
  user: 'scream_cha',
  password: 'scream_cha',
  database: 'dictionary',
  charset: 'utf8'
}

class Database {
  constructor (config) {
    this.connection = mysql.createConnection(config)
  }
  query (sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) { return reject(err) }
        resolve(rows)
      })
    })
  }
  close () {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject(err) }
        resolve()
      })
    })
  }
}

module.exports = new Database(config)
