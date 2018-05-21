/* global Blob */
import FileSaver from 'file-saver'
import { Word } from '../models/Word'

export const parseTextToWords = (text) => {
  const words = text.match(/([а-я]+|\.|!|\?|,)/ig)

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

export const saveText = (text) => {
  const blob = new Blob([text], {type: 'text/plain;charset=utf-8'})
  FileSaver.saveAs(blob, `file-${Date.now()}`)
}
