import { Word } from '../models/Word'

export const parseTextToWords = (text) => {
  const words = text.split(' ')

  return words.map(word => new Word(word))
}

export const assembleTextFromWords = (words) => {
  if (!words.length) {
    return ''
  }

  return words.reduce((prev, cur) => {
    const annotations = cur.annotations.reduce((prevAnn, curAnn) => {
      return `${prevAnn}_${curAnn.code}`
    }, '')

    return `${prev} ${cur.word}${annotations}`
  }, '')
}
