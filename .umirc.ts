// ref: https://umijs.org/config/
import { defineConfig } from 'umi';
import routerConfig from './config/router.config';

export default defineConfig({
  title: 'HOCGIN - 收银台',
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
  theme: {
    'primary-color': '#E24B3A',
  },
  routes: [...routerConfig],
});
