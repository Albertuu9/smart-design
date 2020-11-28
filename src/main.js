import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './../public/styles/style.scss';
import Vuelidate from 'vuelidate';
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Vuelidate,
  i18n,
  render: h => h(App)
}).$mount('#app')
