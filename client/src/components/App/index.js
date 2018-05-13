/* global FileReader */
import React, { Component } from 'react'
import TextEditor from '../TextEditor'
import Buttons from '../Buttons'
import { getAnnotations } from '../../services/annotations'
import { parseTextToWords, assembleTextFromWords } from '../../services/files'
import Word from '../../models/Word'

import './styles.css'

class App extends Component {
  constructor () {
    super()

    this.reader = new FileReader()
    this.reader.onload = event => {
      const words = parseTextToWords(event.target.result)
      this.setState({words})
    }

    this.getAnnotations = this.getAnnotations.bind(this)
    this.openText = this.openText.bind(this)

    this.state = {
      words: []
    }
  }

  async getAnnotations () {
    if (!this.state.words.length) {
      return
    }

    const annotations = await Promise.all(
      this.state.words.map(word => getAnnotations(word.word))
    )

    const annotatedWords = this.state.words.map((word, i) => Word.addAnnotations(word, annotations[i].data))
    this.setState({words: annotatedWords})
  }

  openText (event) {
    const file = event.target.files[0]
    this.reader.readAsText(file)
  }

  render () {
    const text = assembleTextFromWords(this.state.words)
    return (
      <div className='App'>
        <Buttons getAnnotations={this.getAnnotations} openText={this.openText} />
        <TextEditor text={text} />
      </div>
    )
  }
}

export default App
