const fs = require('fs')
const { promisify } = require('util')
const ParsedWord = require('./ParsedWord')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

const parseFiles = filesInfo => {
  const parsedFiles = filesInfo.map(parseFile)
}

const parseFile = (fileInfo) => {
  const words = fileInfo.split('+').filter(word => !!word.replace('\r\n', ''))
  const parsedWords = words.map(word => {
      return new ParsedWord(word.split('\n'))
  })
  parsedWords.filter(word => word !== {})
  return parsedWords
}

readdirPromise('./dictionaries')
  .then(files => {
    return Promise.all(
      files.map(file => readFilePromise(`./dictionaries/${file}`, 'utf8'))
    )
  })
  .then(parseFiles)

// fs.readFile('./dictionaries/Word_comb_sum', 'utf8', parseFile)
