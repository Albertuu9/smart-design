import axios from 'axios'

const HTTP = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

export default HTTP