import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
// import Item from "../views/Item";
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Profile from '../views/Profile';
// import Favorites from '../views/Favorites';
// import AuthGaurd from './auth_guard';
// import firebase from 'firebase/app';

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
      requiresVisitor: true,
    },
    // component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresVisitor: true,
    },
    // component: () => import('../views/SignUp.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    // beforeEnter: AuthGaurd
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: '/favorites',
  //   name: 'Favorites',
  //   component: Favorites,
  //   // beforeEnter: AuthGaurd
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
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

// router.beforeEach((to, from, next) => {
//   firebase.auth().onAuthStateChanged(function(user) {
//     // redirect to signin if a page requiring auth is accessed without login
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (!user) {
//         next({ name: 'SignIn' });
//       } else {
//         next();
//       }
//     }
//     // redirect to home (/) if user attempts to access /signin, /signup after logging in
//     else if (to.matched.some(record => record.meta.requiresVisitor)) {
//       if (user) {
//         next({ name: 'Home' });
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });
// });

export default router;
