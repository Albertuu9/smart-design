import HTTP from '@/config/axios'

const ServicesUser = {

  // get WS all data
  getUserDataById(payload, auth) {
    return HTTP.post('/getUserDataById', payload, auth).then((response) => {
      return response.data
    }).catch((error) => {
      return error
    })
  },

}

export default ServicesUser