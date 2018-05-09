const { flatten } = require('lodash')
const db = require('./mysql')

const findAnnotations = async ctx => {
  try {
    const { word } = ctx.query
    const mainParts = await db.query('select * from main_parts where ? like concat(str,\'%\')', [word])

    const addParts = await Promise.all(
      mainParts.map(part => {
        const currentAddPart = word.substr(part.str.length)
        return db.query('select * from additional_parts where mp_id = ? and str = ?', [part.mp_id, currentAddPart])
      })
    )

    const res = flatten(mainParts.map((mainPart, i) => addParts[i].map(addPart => `${mainPart.code}${addPart.code}`)))

    ctx.body = res
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  findAnnotations
}
