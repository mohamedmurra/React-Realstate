import axios from 'axios'

const url =process.env.REACT_APP_END_POINT
const PrivateApi =axios.create(
 {
 baseURL:url,
 headers:{'Content-Type':'application/json'}
})

export default PrivateApi
