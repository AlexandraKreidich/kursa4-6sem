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

    return handleChangeSelection(text.substr(range.index, range.length + 1).trim())
  }

  render () {
    return (
      <Quill
        className={this.props.selectedWord ? 'editor--shrinked' : 'editor'}
        value={this.props.text}
        onChangeSelection={this.handleChangeSelection}
        {...this.quillProps}
      />
    )
  }
}
