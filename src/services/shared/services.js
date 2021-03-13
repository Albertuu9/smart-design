import HTTP from '@/config/axios'

const ServicesUtil = {

getCountries() {
    return HTTP.get('/getCountries').then((response) => {
      return response.data
    }).catch((error) => {
      return error
    })
  },

}

export default ServicesUtil