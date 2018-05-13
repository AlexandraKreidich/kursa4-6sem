import React, { Component } from 'react'
import Quill from 'react-quill'

import 'react-quill/dist/quill.bubble.css'
import './styles.css'

export default class extends Component {
  constructor () {
    super()

    this.handleSelection = this.handleSelection.bind(this)

    this.quillProps = {
      theme: 'bubble',
      readOnly: true,
      placeholder: 'Your text will be placed here.'
    }
  }

  handleSelection (a, b, c) {
    console.log(11, a, b, c.getSelection())
  }

  render () {
    return (
      <Quill className='editor' value={this.props.text} onChangeSelection={this.handleSelection} {...this.quillProps} />
    )
  }
}
