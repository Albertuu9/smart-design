import HTTP from '@/config/axios'

const ServicesGoogle = {

    loginGoogle(payload) {
        return HTTP.post('/loginGoogle', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

}

export default ServicesGoogle