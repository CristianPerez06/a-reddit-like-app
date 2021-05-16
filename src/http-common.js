import axios from 'axios'

const BASE_URL = 'https://dummyapi.io/data/api'
const APP_ID = '609d924de7ff743d0e88df1a'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'app-id': APP_ID,
    'Content-type': 'application/json'
  }
})
