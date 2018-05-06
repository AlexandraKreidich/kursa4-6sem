const fs = require('fs')
const { promisify } = require('util')
const ParsedWord = require('./ParsedWord')

const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

const parseFiles = filesInfo => {
  const parsedFiles = filesInfo.map(parseFile)
  console.log(parsedFiles)
}

const parseFile = (e, fileInfo) => {
  const words = fileInfo.split('+').filter(word => !!word.replace('\r\n', ''))
  const parsedWords = words.map(word => {
    console.log(new ParsedWord(word.split('\n')))
      return new ParsedWord(word.split('\n'))
  })
  return parsedWords
}

// readdirPromise('./dictionaries')
//   .then(files => {
//     return Promise.all(
//       files.map(file => readFilePromise(`./dictionaries/${file}`, 'utf8'))
//     )
//   })
//   .then(parseFiles)

fs.readFile('./dictionaries/Noun_sum', 'utf8', parseFile)
