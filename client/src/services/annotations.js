import axios from 'axios'

export const getAnnotations = async (word) => {
  return axios.get(`http://localhost:3001/annotations?word=${word}`)
}
