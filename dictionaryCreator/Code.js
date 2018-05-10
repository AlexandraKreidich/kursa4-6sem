class Code {
  constructor (code, def) {
    this.code = code
    this.definition = def.substr(0, def.length - 1)
  }
}

module.exports = Code
