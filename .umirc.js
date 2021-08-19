// ref: https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  title: '收银台',
  antd: {},
  dva: {},
  outputPath: './dist',
  proxy: {
    '/api': {
      // target: 'https://api-dev.hocgin.top/',
      target: 'http://127.0.0.1:20001/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/cashier', component: '@/pages/cashier/index' },
        { path: '/cashier/result', component: '@/pages/cashier/result/index' },
      ],
    },
  ],
});
