import axios from 'axios'

export const apiService = (config) => {
  const instance = axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true, // 允许携带cookie
    timeout: 50000,
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}