const fs = require('fs')
const { promisify } = require('util')
const ParsedWord = require('./ParsedWord')
const mysqlConnection = require('./dbConnection')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

const parseFiles = filesInfo => {
  return Promise.resolve(filesInfo.map(parseFile))
}

const parseFile = (fileInfo) => {
  const words = fileInfo.split('+').filter(word => !!word.replace('\r\n', ''))
  const parsedWords = words.map(word => {
    return new ParsedWord(word.split('\n'))
  })
  parsedWords.filter(word => word !== {})
  return parsedWords
}

const populateDb = (parsedWords) => {
  return parsedWords.forEach(words => {
    words.forEach(word => {
      if (!word.mainId) {
        return;
      }
      mysqlConnection.query(
        'insert into main_parts set ?',
        {
          str: word.commonPart,
          code: word.mainId
        },
        (err, result) => {
          const { changableParts } = word
          if (!changableParts) {
            console.log(changableParts)
            return
          }
          const mainId = result.insertId
          changableParts.forEach(part => {
            mysqlConnection.query(
              'insert into additional_parts set ?',
              {
                mp_id: mainId,
                str: part.str,
                code: part.id
              }
            )
          })
        }
      )
    })
  })
}

readdirPromise('./dictionaries')
  .then(files => {
    return Promise.all(
      files.map(file => readFilePromise(`./dictionaries/${file}`, 'utf8'))
    )
  })
  .then(parseFiles)
  .then(populateDb)
  // .then(() => mysqlConnection.end())

// fs.readFile('./dictionaries/Preposition', 'utf8', parseFile)
