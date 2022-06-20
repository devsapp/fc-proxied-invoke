import { lodash as _ } from '@serverless-devs/core';

export function mark(source: string): string {
  if (!source) {
    return source;
  }

  const subStr = source.slice(-4);
  return `***********${subStr}`;
}

export function isFalseValue(val) {
  return val && (_.toLower(val) === 'false' || val === '0');
}

export function bytesToSize(bytes: number): String {
  var size = '';
  if (bytes < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = bytes.toFixed(2) + 'B';
  } else if (bytes < 0.1 * 1024 * 1024) {
    //小于0.1MB，则转化成KB
    size = (bytes / 1024).toFixed(2) + 'KB';
  } else if (bytes < 0.1 * 1024 * 1024 * 1024) {
    //小于0.1GB，则转化成MB
    size = (bytes / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }

  var sizeStr = size + ''; //转成字符串
  var index = sizeStr.indexOf('.'); //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
  if (dou == '00') {
    //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
}
