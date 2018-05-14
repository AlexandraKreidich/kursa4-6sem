import React, { Component } from 'react'

import './styles.css'

export default class extends Component {
  render () {
    const { word } = this.props
    return (
      <div className='word-info'>
        <h3 className='text'>Word: {word.word} </h3>
        <h4>Annotations:</h4>
        <ul className='annotations'>
          {word.annotations.map(ann => <li>{ann.code} - {ann.definition}</li>)}
        </ul>
      </div>
    )
  }
}
