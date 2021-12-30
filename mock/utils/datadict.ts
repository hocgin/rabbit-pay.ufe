import Mock from 'mockjs';

/**
 * 获取指定下标的数据字典
 * @param options
 * @param index
 */
export function datadict(options: any, index?: number): { key: string, value: string } {
  let keys = Object.keys(options);
  if (!index) {
    index = Mock.Random.integer(0, keys.length - 1);
  }
  let key = keys[index];
  return {
    key: options[key],
    value: key,
  };
}
