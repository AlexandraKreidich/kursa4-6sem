const findInterception = (firstString, secondString) => {
  let result = ''
  const length = Math.min(firstString.length, secondString.length)
  for (let i = 0; i < length; ++i) {
    if (firstString[i] !== secondString[i]) {
      return result
    }
    result += firstString[i]
  }
  return result
}

class ParsedWord {
  constructor (wordInfo) {
    wordInfo = wordInfo.filter(info => !!info && !!info.replace('\r', ''))
      .map(entry => {
        const end = entry.indexOf('=')
        return entry.slice(0, end).trim()
      })
    if (!wordInfo.length) {
      return
    }

    this.mainId = wordInfo[0].substring(1)
    wordInfo.shift()
    this.commonPart = wordInfo.reduce(findInterception)
    if (this.commonPart.includes('_')) {
      this.commonPart = this.commonPart.slice(0, this.commonPart.indexOf('_'))
    }
    this.changableParts = []
    wordInfo.forEach((unprocessedPart) => {
      const unprocessedPartArray = unprocessedPart.split('_')
      const processedPart = {
        str: unprocessedPartArray[0].replace(this.commonPart, ''),
        id: unprocessedPartArray[1]
      }

      this.changableParts.push(processedPart)
    })
  }
}

module.exports = ParsedWord
