import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://blooming-hollows-91764.herokuapp.com'
})

export default instance