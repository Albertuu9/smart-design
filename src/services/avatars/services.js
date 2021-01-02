import HTTP from '@/config/axios'

const ServicesAvatar = {

  loadAvatars() {
    return HTTP.post('/loadAvatars').then((response) => {
      return response.data
    }).catch((error) => {
      return error
    })
  }

}

export default ServicesAvatar