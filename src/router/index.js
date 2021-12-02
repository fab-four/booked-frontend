import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
// import Item from "../views/Item";
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Profile from '../views/Profile';
import Catalogue from '../views/Catalogue';
import Favorites from '../views/Favorites';
import Orders from '../views/Orders';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/book/:id',
    name: 'Item',
    props: true,
    component: () => import('../views/Item.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/catalogue',
    name: 'Catalogue',
    component: Catalogue,
    meta: {
      requiresAuth: true,
      requiresSeller: true,
    },
  },
  {
    path: '/mybooks',
    name: 'Favorites',
    component: Favorites,
    meta: {
      requiresAuth: true,
      requiresBuyer: true,
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    name: 'Invalid Path',
    component: Home,
    redirect: { name: 'Home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch('autoSignIn')
    .then(() => {
      let isAuthenticated = store.getters.isAuthenticated;
      if (to.matched.some((route) => route.meta.requiresAuth)) {
        if (!isAuthenticated) {
          next({ name: 'SignIn' });
        } else if (to.meta.requiresSeller && !store.getters.user.isSeller) {
          next({ name: 'Home' });
        }  else if (to.meta.requiresBuyer && store.getters.user.isSeller) {
          next({ name: 'Home' });
        } else {
          next();
        }
      } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (isAuthenticated) {
          next({ name: 'Home' });
        } else {
          next();
        }
      } else {
        next();
      }
    });
  
});
export default router;
