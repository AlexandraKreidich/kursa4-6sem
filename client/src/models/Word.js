import { uniqWith, isEqual } from 'lodash'

export class Word {
  constructor (word) {
    this.word = word
    this.annotations = []
  }

  static addAnnotations (word, annotations) {
    const _annotations = uniqWith(word.annotations.concat(annotations), isEqual)
    return {
      ...word,
      annotations: _annotations
    }
  }

  removeAnnotation (code) {
    this.annotations = this.annotations.filter(ann => code !== ann.code)
  }
}
