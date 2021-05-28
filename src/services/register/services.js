import HTTP from '@/config/axios'

const ServicesRegister = {

  // get WS all data
  
  getClientIp(){
    return HTTP.get('http://localhost:8080').then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  checkMailExists(payload) {
    return HTTP.post('/checkMail', payload).then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  saveNewUser(payload) {
    return HTTP.post('/saveNewUser', payload).then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  updateUserInfo(payload) {
    return HTTP.post('/updateUserInfo', payload).then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  loginGuest() {
    return HTTP.post('/loginGuest').then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  getUserIp() {
    return HTTP.post('/getUserIp').then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  getUserCountryByIp(payload) {
    return HTTP.post('/getUserCountryByIp', payload).then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },

}

export default ServicesRegister