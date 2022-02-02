import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthService from '../services/auth.service'

Vue.use(VueRouter);

const routes = [  
  {
    path: '/',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Hashmap.vue'),
    meta : {
      authenticated : true
    }
  },
  {
    path: '/admin-home',
    name: 'admin-home',
    component: () => import('../components/AdminHome.vue'),
    meta : {
      authenticated : true,
      admin : true
    }
  },
  {
    path: '/admin-hashmap/:userId',
    name: 'admin-hashmap',
    component: () => import('../components/AdminHashmap.vue'),
    meta : {
      authenticated : true,
      admin : true
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

/* Routes guard*/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticated)) {
    if (!AuthService.isLoggedIn()) {
      next({
        name: 'login',
      })
    } else {
      if (to.matched.some(record => record.meta.admin)) {
        if (!AuthService.isAdmin()) {
          next({
            name: 'home',
          })
        } else {
          next();
        } 
      } else {
        next();
      }
    }
  } else {    
    if (!AuthService.isLoggedIn()) {
      next()
    } else {
      next({ name: 'admin-home' })
    }    
  }
})
export default router;
