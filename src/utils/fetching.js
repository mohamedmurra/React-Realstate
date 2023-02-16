import axios from 'axios'

const url = process.env.REACT_APP_END_POINT

const api = axios.create({
  baseURL: url,
})

export default api
