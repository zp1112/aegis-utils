(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.AegisUtils = factory());
}(this, (function () { 'use strict';

/**
 * Created by candy on 2017/11/28.
 */
const _trim = (str, type) => {
  // 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
  switch (type) {
    case 1: return str.replace(/\s+/g, '');
    case 2: return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3: return str.replace(/(^\s*)/g, '');
    case 4: return str.replace(/(\s*$)/g, '');
    default:return str;
  }
};
const AegisUtils = {
  subList: (list, curIndex, per) => {
    if (per < 0 || curIndex < 0) {
      return {
        nextList: [],
        nextIndex: 0
      };
    }
    let nextIndex = curIndex + per;
    const nextList = list.slice(curIndex, nextIndex);
    if (nextIndex >= list.length) {
      nextIndex = 0;
    }
    return {
      nextList,
      nextIndex
    };
  },
  // 去掉空格
  trim: _trim,
  // 替换字符
  replaceAll: (str, AFindText, ARepText) => {
    const raRegExp = new RegExp(AFindText, 'g');
    return str.replace(raRegExp, ARepText);
  },
  // 数组去重
  /* istanbul ignore if  */
  removeRepeatArray: arr => Array.from(new Set(arr)),
  // 数组升序排列
  /* istanbul ignore if  */
  upsetArr: arr => arr.sort(() => Math.random() - 0.5),
  // 数组最大值
  /* istanbul ignore if  */
  maxArr: arr => Math.max.apply(null, arr),
  // 数组最小值
  /* istanbul ignore if  */
  minArr: arr => Math.min.apply(null, arr),
  // 节流函数
  /* istanbul ignore if  */
  throttle: (method, delay, context) => function (...args) {
    if (!method.tid) {
      method.call(context, ...args);
      method.tid = 1;
      setTimeout(() => (method.tid = 0), delay);
    }
  },
  // 找出字符串中字符数最多的那个字符,不包括空格
  countNum: (str) => {
    const e = [];
    const a = [...new Set(_trim(str, 1).split(''))].map((row) => {
      const reg = new RegExp(row, 'g');
      return {
        key: row,
        value: str.match(reg).length
      };
    });
    a.map(row => row.value === Math.max(...a.map(row => row.value)) ? e.push(row.key) : null);
    return e;
  },
  // 获取元素的css样式
  getStyle: (oElm, strCssRule) => {
    let strValue = '';
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, (strMatch, p1) => p1.toUpperCase());
      strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
  },
  // 字符串截取
  cutstr: (str, len) => {
    let temp = '';
    let icount = 0;
    const patrn = /[^\x00-\xff]/;
    let strre = '';
    for (let i = 0; i < str.length; i += 1) {
      if (icount <= len - 1) {
        temp = str.substr(i, 1);
        // 汉子或者全角的话算2个字节
        if (patrn.exec(temp) == null) {
          icount += 1;
        } else {
          icount += 2;
        }
        strre += temp;
      } else {
        break;
      }
    }
    return `${strre}...`;
  },
  // 从身份证获取信息
  discriCard: (id) => {
    const result = {};
    const UUserCard = id;
    result.date = `${UUserCard.substring(6, 10)}-${UUserCard.substring(10, 12)}-${UUserCard.substring(12, 14)}`;
    if (parseInt(UUserCard.substr(16, 1), 10) % 2 === 1) {
      result.sex = '男';
    } else {
      result.sex = '女';
    }
    return result;
  },
  // 检查日期有效性
  checkDate: (val) => {
    const a = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!a.test(val)) {
      return false;
    }
    return true;
  },
  // 生成随机密码
  randomPassword: (size) => {
    const seed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '2', '3', '4', '5', '6', '7', '8', '9'];
    const seedlength = seed.length;
    let createPassword = '';
    let j;
    for (let i = 0; i < size; i++) {
      j = Math.floor(Math.random() * seedlength);
      createPassword += seed[j];
    }
    return createPassword;
  },
  // 常见的正则表达式
  myRegExp: {
    // 检查字符串是否为合法QQ号码
    isQQ (str) {
      // 1 首位不能是0  ^[1-9]
      // 2 必须是 [5, 11] 位的数字  \d{4, 9}
      const reg = /^[1-9][0-9]{4,9}$/gim;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法手机号码
    isPhone (str) {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法Email地址
    isEmail (str) {
      const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否是数字
    isNumber (str) {
      const reg = /^\d+$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否存在中文
    isChinese (str) {
      const reg = /[\u4e00-\u9fa5]/gm;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法邮政编码
    isPostcode (str) {
      // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
      const reg = /^[1-9]\d{5}$/g;
      // var reg = /^[1-9]\d{5}(?!\d)$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法身份证号码
    isIDcard (str) {
      const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法URL
    isURL (str) {
      const reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法日期格式 yyyy-mm-dd
    isDate (str) {
      const reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    // 检查字符串是否为合法IP地址
    isIP (str) {
      // 1.1.1.1  四段  [0 , 255]
      // 第一段不能为0
      // 每个段不能以0开头
      //
      // 本机IP: 58.50.120.18 湖北省荆州市 电信
      const reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
      if (reg.test(str)) {
        return true;
      }
      return false;
    }
  },
  pick: (obj, keys, emp) => keys.map(k => k in obj ? { [k]: obj[k] } : emp ? { [k]: '' } : {})
    .reduce((res, o) => Object.assign(res, o), {}),
  reject: (obj, keys) => Object.keys(obj)
    .filter(k => !keys.includes(k))
    .map(k => ({ [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {}),
    convertCurrency
}; 
// console.log(quickSort([3, 1, 5, 4, 6, 8, 7, 9]));
function convertCurrency (money) {
  // 汉字的数字
  const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  // 基本单位
  const cnIntRadice = new Array('', '拾', '佰', '仟');
  // 对应整数部分扩展单位
  const cnIntUnits = new Array('', '万', '亿', '兆');
  // 对应小数部分单位
  const cnDecUnits = new Array('角', '分', '毫', '厘');
  // 整数金额时后面跟的字符
  const cnInteger = '整';
  // 整型完以后的单位
  const cnIntLast = '元';
  // 最大处理的数字
  const maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    const IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

return AegisUtils;

})));
