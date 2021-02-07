import HTTP from '@/config/axios'

const url = 'https://restcountries.eu/rest/v2/all'

const ServicesRegister = {

  // get WS all data
  getCountries() {
    return HTTP.get(url).then((response) => {
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