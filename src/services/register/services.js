import HTTP from '@/config/axios'

const url = 'https://restcountries.eu/rest/v2/all'

const ServicesRegister = {

  // get WS all data
  getCountries(payload) {
    return HTTP.get(url).then((response) => {
      return response
    }).catch((error) => {
      return error
    })
  },

}

export default ServicesRegister