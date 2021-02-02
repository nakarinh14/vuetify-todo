import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import publicRoutes from '@/router/public';
import privateRoutes from '@/router/private';

Vue.use(VueRouter);

const routes = publicRoutes.concat(privateRoutes);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters['auth/user']) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
