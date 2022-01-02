import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    baseUrl: 'https://bmw.hocgin.top',
    ssoServerUrl: 'https://bmw.hocgin.top/login',
  },
  hash: true,
  favicon: 'https://hocg.in/favicon.ico',
  publicPath: `https://cdn.hocgin.top/${__dirname.split('/').pop()}/`,
});
