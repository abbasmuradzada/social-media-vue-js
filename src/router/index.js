import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      isOnlyPublic: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
      isOnlyPublic: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      isOnlyPublic: false
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.isOnlyPublic)
  const isRequireAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated;

  if (!isPublic && !isAuthenticated) {
    return next({
      path: '/login',
      query: {
        redirect: to.path
      } // Store the full path to redirect the user to after login
    })
  }

  if (isPublic && !isAuthenticated) {
    // show notification
    // please log out to see page
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (isAuthenticated && !isRequireAuth) {
    return next('/')
  }

  next()
})

export default router
