import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const meta = {
  requiresAuth: false,
};

export default routes.map((route) => ({ ...route, meta }));
