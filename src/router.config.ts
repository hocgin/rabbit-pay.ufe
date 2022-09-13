export default [
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {path: '/', component: '@/pages/index/index'},
      {path: '/cashier', component: '@/pages/index/index'},
      {path: '/result', component: '@/pages/result/index'},
      {path: '/404', component: '@/pages/404'},
    ],
  },
  {component: '@/pages/404'}
];
