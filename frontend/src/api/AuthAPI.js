import api from'../lib/axios.js'

export default {
  signUp(data) {
    return api.post('auth/sign-up', data)
  },
  confirmAccount(token) {
    return api.get(`auth/confirm-account/${token}`)
  },
  login(data) {
    return api.post('auth/login', data)
  },
  auth(){
    const token = localStorage.getItem('AUTH_TOKEN')
    return api.get(`auth/user`, {
      headers:{
        Authorization:`Bearer ${token}`
      }})
  }
}
