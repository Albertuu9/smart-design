import HTTP from '@/config/axios'

const ServicesRegister = {

  // get WS all data
  
  getClientIp(){
    return HTTP.get('https://api.ipify.org/?format=json').then((response) => {
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
  loginGuest() {
    return HTTP.post('/loginGuest').then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },
  getUserIp(payload) {
    return HTTP.post('/getUserIp', payload).then((response) => {
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