/* global FileReader */
import React, { Component } from 'react'
import { uniqWith, isEqual } from 'lodash'
import TextEditor from '../TextEditor'
import Buttons from '../Buttons'
import WordInfo from '../WordInfo'
import { getAnnotations, getAnnotationsList } from '../../services/annotations'
import { parseTextToWords, assembleTextFromWords, saveText } from '../../services/files'
import { Word } from '../../models/Word'

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
    this.getAnnotationsList = this.getAnnotationsList.bind(this)
    this.openText = this.openText.bind(this)
    this.selectWord = this.selectWord.bind(this)
    this.saveText = this.saveText.bind(this)
    this.removeAnnotation = this.removeAnnotation.bind(this)
    this.addAnnotation = this.addAnnotation.bind(this)
    this.toggleAnnList = this.toggleAnnList.bind(this)

    this.state = {
      words: [],
      selectedWord: null,
      annList: null,
      isAnnListOpen: false
    }
  }

  componentDidMount () {
    this.getAnnotationsList()
  }

  async getAnnotations () {
    if (!this.state.words.length) {
      return
    }

    const annotations = await Promise.all(
      this.state.words.map(word => getAnnotations(word.word))
    )

    const annotatedWords = this.state.words.map((word, i) => Word.addAnnotations(word, annotations[i].data))
    const changeStatePayload = {words: annotatedWords}
    if (this.state.selectedWord) {
      changeStatePayload.selectedWord = annotatedWords.find(word => word.word === this.state.selectedWord.word)
    }
    this.setState(changeStatePayload)
  }

  async getAnnotationsList () {
    const res = await getAnnotationsList()
    this.setState({annList: res.data})
  }

  openText (event) {
    const file = event.target.files[0]
    this.reader.readAsText(file)
  }

  selectWord (selection) {
    const { words } = this.state
    this.setState({selectedWord: words.find(({word}) => word.includes(selection))})
  }

  saveText () {
    const text = assembleTextFromWords(this.state.words)
    saveText(text)
  }

  removeAnnotation (word, code) {
    const editedWord = {...word, annotations: word.annotations.filter(ann => ann.code !== code)}
    const index = this.state.words.indexOf(word)
    this.setState({
      words: [...this.state.words.slice(0, index), editedWord, ...this.state.words.slice(index + 1)],
      selectedWord: editedWord})
  }

  addAnnotation (word, code) {
    const editedWord = { ...word, annotations: uniqWith(word.annotations.concat({code, definition: 'kek'}), isEqual) }
    const index = this.state.words.indexOf(word)
    this.setState({
      words: [...this.state.words.slice(0, index), editedWord, ...this.state.words.slice(index + 1)],
      selectedWord: editedWord})
  }

  toggleAnnList (openBool) {
    this.setState({isAnnListOpen: openBool})
  }

  render () {
    const { selectedWord, isAnnListOpen, annList } = this.state
    let { getAnnotations, openText, selectWord, saveText, removeAnnotation } = this
    const text = assembleTextFromWords(this.state.words)
    return (
      <div className='App'>
        <Buttons getAnnotations={getAnnotations} openText={openText} saveText={saveText} />
        <TextEditor text={text} handleChangeSelection={selectWord} selectedWord={selectedWord} />
        {selectedWord &&
          <WordInfo
            word={selectedWord}
            removeAnnotation={removeAnnotation}
            list={annList}
            isListOpen={isAnnListOpen}
            toggleList={this.toggleAnnList}
            addAnnotation={this.addAnnotation}
          />
        }
      </div>
    )
  }
}

export default App
