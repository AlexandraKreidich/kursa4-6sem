import React, { Component } from 'react'

import './styles.css'

export default class extends Component {
  constructor () {
    super()

    this.removeAnnotation = this.removeAnnotation.bind(this)
    this.pickAnnotation = this.pickAnnotation.bind(this)
    this.openList = this.openList.bind(this)
    this.closeList = this.closeList.bind(this)
  }

  pickAnnotation (ev) {
    const elem = ev.target
    this.props.addAnnotation(this.props.word, elem.id)
  }

  removeAnnotation (ev) {
    const elem = ev.target
    if (elem.className === 'remove-ann') {
      this.props.removeAnnotation(this.props.word, elem.parentElement.id)
    }
  }

  openList () {
    this.props.toggleList(true)
  }

  closeList () {
    this.props.toggleList(false)
  }

  render () {
    const { word, list, isListOpen } = this.props
    return (
      <div className='word-info'>
        <h3 className='text'>Word: {word.word} </h3>
        {!isListOpen &&
          <React.Fragment>
            <h4>Annotations:</h4>
            <ul className='annotations' onClick={this.removeAnnotation}>
              {word.annotations.map(ann => <li id={ann} key={ann}><span className='remove-ann'>x</span>{ann} - {list[ann]}</li>)}
            </ul>
            <button onClick={this.openList}>Add more</button>
          </React.Fragment>
        }
        {isListOpen &&
          <React.Fragment>
            <ul onClick={this.pickAnnotation} className='ann-list'>
              {Object.keys(list).map(ann => <li id={ann} key={ann}>{ann} - {list[ann]}</li>)}
            </ul>
            <div className='picked'>
              Picked: {word.annotations.reduce((prev, next) => {
                return prev ? `${prev}, ${next}` : next
              }, '')}
            </div>
            <button className='go-back' onClick={this.closeList}>Go Back</button>
          </React.Fragment>
        }
      </div>
    )
  }
}
