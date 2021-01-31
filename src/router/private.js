const routes = [
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('@/views/Todo.vue'),
  },
];

const meta = {
  requiresAuth: true,
};

export default routes.map((route) => ({ ...route, meta }));
