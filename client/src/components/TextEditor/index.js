import React, { Component } from 'react'
import Quill from 'react-quill'

import 'react-quill/dist/quill.bubble.css'
import './styles.css'

export default class extends Component {
  constructor () {
    super()

    this.handleChangeSelection = this.handleChangeSelection.bind(this)

    this.quillProps = {
      theme: 'bubble',
      readOnly: true,
      placeholder: 'Your text will be placed here.'
    }
  }

  handleChangeSelection (range, source, editor) {
    const { text, handleChangeSelection } = this.props
    if (!range || !range.length) {
      return
    }

    let word = text.substr(range.index, range.length + 1).trim()
    if (/_/.test(word)) {
      word = word.split('_')[0]
    }
    return handleChangeSelection(word)
  }

  render () {
    const { selectedWord, text } = this.props
    const { handleChangeSelection, quillProps } = this
    return (
      <Quill
        className={selectedWord ? 'editor--shrinked' : 'editor'}
        value={text}
        onChangeSelection={handleChangeSelection}
        {...quillProps}
      />
    )
  }
}
