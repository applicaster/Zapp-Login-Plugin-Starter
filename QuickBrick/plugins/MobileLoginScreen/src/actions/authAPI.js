import axios from 'axios'

const API = axios.create({
  baseURL: 'YOUR BASE API URL HERE !!!!',
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const loginRequest = async (url, params = {}, isTest = false) => {
  if (isTest) {
    return new Promise(resolve => resolve(true))
  }
  await API.post(url, {
    ...params,
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
