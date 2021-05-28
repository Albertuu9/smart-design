import Vue from 'vue'
import Vuex from 'vuex'

// services
import ServicesUser from './../services/user/services';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: ""
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getToken: state => {
      return state.token
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    getUserData({commit}, payload) {
      if(payload.id.name) {
        commit('setUser',payload.id);
      } else {
        return ServicesUser.getUserDataById(payload).then((data) => {
          if(data.code === 200) {
            commit('setUser',data.user[0]);
          } else {
            switch(response.data.code) {
              case 401:
                this.$toast.error(this.$t("generic.token_not_valid"));
              break;
            }
          }
        })
      }
    }
  },
})
