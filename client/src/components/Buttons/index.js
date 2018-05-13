import React from 'react'

import './styles.css'

export default (props) => {
  return (
    <div className='buttons-container'>
      <input type='file' name='file' id='file' className='input-file' accepts='text/plain' multiple='false' onChange={props.openText} />
      <label htmlFor='file' className='button'>open text</label>
      <div className='button' onClick={props.getAnnotations}>annotate text</div>
      <div className='button'>save text</div>
    </div>
  )
}
