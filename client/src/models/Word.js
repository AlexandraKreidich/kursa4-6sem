import { uniqWith, isEqual } from 'lodash'

export class Word {
  constructor (word) {
    let _word = word
    let _annotations = []
    if (_word.includes('_')) {
      _annotations = word.split('_')
      _word = _annotations.shift()
    }
    this.word = _word
    this.annotations = _annotations
  }

  static addAnnotations (word, annotations) {
    const _annotations = uniqWith(word.annotations.concat(annotations), isEqual)
    return {
      ...word,
      annotations: _annotations
    }
  }
}
