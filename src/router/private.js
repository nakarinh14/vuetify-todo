const routes = [
  {
    path: '/',
    name: 'Todo',
    component: () => import(/* webpackChunkName: "todo" */ '@/views/Todo.vue'),
  },
];

const meta = {
  requiresAuth: true,
};

export default routes.map((route) => ({ ...route, meta }));
