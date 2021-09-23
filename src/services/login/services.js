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
    },

    sendRecoverPasswordCode(payload) {
        return HTTP.post('/sendRecoverPasswordCode', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

    checkCodeIsValid(payload) {
        return HTTP.post('/checkCodeExists', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

    updatePassword(payload) {
        return HTTP.post('/changePassword', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

    updateAvatar(payload) {
        return HTTP.post('/updateAvatar', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

    checkUserById(payload) {
        return HTTP.post('/checkUserById', payload).then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    },

}

export default ServicesLogin