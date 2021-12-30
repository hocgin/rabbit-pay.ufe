export default [{
  path: '/',
  component: '@/layouts/BasicLayout',
  routes: [
    { path: '/', component: '@/pages/index/index' },
    { path: '/cashier', component: '@/pages/index/index' },
    { path: '/result', component: '@/pages/result/index' },
  ],
}, { component: '@/pages/404' }];
