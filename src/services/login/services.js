import HTTP from '@/config/axios'

const ServicesLogin = {

    login(payload) {
        return HTTP.post('/login', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

    checkTokenIsValid(payload) {
        return HTTP.post('/checkToken', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    }

}

export default ServicesLogin