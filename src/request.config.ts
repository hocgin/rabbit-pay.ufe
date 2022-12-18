import { defaultRequestOptions, LangKit } from '@hocgin/hkit';
import Config from '@/config';
import { message } from 'antd';

// 网络请求配置
defaultRequestOptions({
  baseUrl: process.env.baseUrl,
  ssoServerUrl: process.env.ssoServerUrl,
  addHeaders: async () => {
    let headers: any = {};
    if (Config.isDev()) {
      headers['X-Username'] = 'hocgin';
    }
    return headers;
  },
  errorHandler: (error: any) =>
    LangKit.isBrowser() && message.error(error.message),
});
