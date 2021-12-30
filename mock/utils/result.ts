/**
 * 模拟返回结构
 */
export default function result(
  code: any,
  message: string,
  data: any,
) {
  return {
    code: code,
    message: message,
    data: data,
  };
};

export function success(data: any = null) {
  return result(200, 'ok', data);
}

export function error(message: string = 'error', data: any = null) {
  return result(500, message, data);
}
