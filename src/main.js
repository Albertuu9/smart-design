import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './../public/styles/style.scss';
import Vuelidate from 'vuelidate';
import VueFlags from "@growthbunker/vueflags";

Vue.config.productionTip = false

Vue.use(VueFlags, {
  // Specify the path of the folder where the flags are stored.
  iconPath: './assets/img/flags',
});

new Vue({
  router,
  store,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
