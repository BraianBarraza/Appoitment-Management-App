import api from'../lib/axios.js'

export default {
  signUp(data) {
    return api.post('auth/sign-up', data)
  },
  confirmAccount(token) {
    return api.get(`auth/confirm-account/${token}`)
  }
}
