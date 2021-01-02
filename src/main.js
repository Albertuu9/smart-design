import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './../public/styles/style.scss';
import Vuelidate from 'vuelidate';
import VueToast from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(VueToast, {
  position: "bottom",
  duration: 3000,
  queue: false
});


new Vue({
  router,
  store,
  vuetify,
  Vuelidate,
  i18n,
  render: h => h(App)
}).$mount('#app')
