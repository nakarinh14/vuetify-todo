const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
];

const meta = {
  requiresAuth: false,
};

export default routes.map((route) => ({ ...route, meta }));
