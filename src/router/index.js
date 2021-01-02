import Vue from 'vue'
import VueRouter from 'vue-router'
// components
import Home from './../views/home/Home'
import Login from './../views/login/Login'
import Register from './../views/register/Register'
// services
import ServicesLogin from './../services/login/services'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let promises = [];
    let token = JSON.parse(localStorage.getItem('token'));
    let accessPage = false
    if(token) {
      promises.push(checkTokenIsValid(token).then((response) => {
        if(response.data.code === 200) {
          accessPage = true;
        }
      }))
    }
    Promise.all(promises).then(() => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (accessPage) {
            next();
          } else {
            Vue.$toast.error("No puedes seguir usando la plataforma, por favor, inicia sesión o accede como invitado");
            next('/login');
          } 
      } else {
        if(accessPage) {
          router.go(-1);
          return;
        } else {
          next();
        }
      }
    })
})

function checkTokenIsValid(token){
  let payload = {
    token: token
  }
  return ServicesLogin.checkTokenIsValid(payload);
}

export default router
