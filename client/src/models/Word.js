export default class {
  constructor (word) {
    this.word = word
    this.annotations = []
  }

  static addAnnotations (word, annotations) {
    return {
      ...word,
      annotations: word.annotations.concat(annotations)
    }
  }

  removeAnnotation (code) {
    this.annotations = this.annotations.filter(ann => code !== ann.code)
  }
}
