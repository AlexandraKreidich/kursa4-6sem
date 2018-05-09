const fs = require('fs')
const { promisify } = require('util')
const { flatten } = require('lodash')
const ParsedWord = require('./ParsedWord')
const Code = require('./Code')
const db = require('./mysql')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

const parseFiles = filesInfo => {
  return flatten(filesInfo.map(parseFile))
}

const parseFile = (fileInfo) => {
  const words = fileInfo.split('+').filter(word => !!word.replace('\r\n', ''))
  const parsedWords = words.map(word => {
    return new ParsedWord(word.split('\n'))
  })
  parsedWords.filter(word => word !== {})
  return parsedWords
}

const populateDb = async (word) => {
  if (!word.mainId) {
    return
  }

  const res = await db.query(
    'insert into main_parts set ?',
    {
      str: word.commonPart,
      code: word.mainId
    })

  const { changableParts } = word
  if (!changableParts) {
    return
  }
  const mainId = res.insertId
  await Promise.all(
    changableParts.map(part => {
      db.query(
        'insert into additional_parts set ?',
        {
          mp_id: mainId,
          str: part.str,
          code: part.id
        }
      )
    })
  )
}

const parseCodes = (file) => {
  const lines = file.split('\n')
  const codes = lines.map(line => {
    return new Code(...line.split('\t'))
  })

  return codes
}

const addCodesToDb = async (codes) => {
  await Promise.all(
    codes.map(code => db.query('insert into codes set ?', code))
  )
}

readdirPromise('./dictionaries')
  .then(files => {
    return Promise.all(
      files.map(file => readFilePromise(`./dictionaries/${file}`, 'utf8'))
    )
  })
  .then(parseFiles)
  .then(
    parsedWords => {
      console.log('starting to populate db...')
      return Promise.all(
        parsedWords.map(word => populateDb(word))
      )
    }
  )
  .then(() => readFilePromise('./rus_tag_help.txt', 'utf8'))
  .then(parseCodes)
  .then(addCodesToDb)
  .then(() => db.close())
