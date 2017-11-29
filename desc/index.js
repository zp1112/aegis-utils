'use strict';

var _defineProperty2 = require('babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _from2.default)(arr); } }

var _trim = function _trim(str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
};
var AegisUtils = {
  subList: function subList(list, curIndex, per) {
    if (per < 0 || curIndex < 0) {
      return {
        nextList: [],
        nextIndex: 0
      };
    }
    var nextIndex = curIndex + per;
    var nextList = list.slice(curIndex, nextIndex);
    if (nextIndex >= list.length) {
      nextIndex = 0;
    }
    return {
      nextList: nextList,
      nextIndex: nextIndex
    };
  },

  trim: _trim,

  replaceAll: function replaceAll(str, AFindText, ARepText) {
    var raRegExp = new RegExp(AFindText, 'g');
    return str.replace(raRegExp, ARepText);
  },

  removeRepeatArray: function removeRepeatArray(arr) {
    return (0, _from2.default)(new _set2.default(arr));
  },

  upsetArr: function upsetArr(arr) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  },

  maxArr: function maxArr(arr) {
    return Math.max.apply(null, arr);
  },

  minArr: function minArr(arr) {
    return Math.min.apply(null, arr);
  },

  throttle: function throttle(method, delay, context) {
    return function () {
      if (!method.tid) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        method.call.apply(method, [context].concat(args));
        method.tid = 1;
        setTimeout(function () {
          return method.tid = 0;
        }, delay);
      }
    };
  },

  countNum: function countNum(str) {
    var e = [];
    var a = [].concat(_toConsumableArray(new _set2.default(_trim(str, 1).split('')))).map(function (row) {
      var reg = new RegExp(row, 'g');
      return {
        key: row,
        value: str.match(reg).length
      };
    });
    a.map(function (row) {
      return row.value === Math.max.apply(Math, _toConsumableArray(a.map(function (row) {
        return row.value;
      }))) ? e.push(row.key) : null;
    });
    return e;
  },

  getStyle: function getStyle(oElm, strCssRule) {
    var strValue = '';
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
    } else if (oElm.currentStyle) {
      strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase();
      });
      strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
  },

  cutstr: function cutstr(str, len) {
    var temp = '';
    var icount = 0;
    var patrn = /[^\x00-\xff]/;
    var strre = '';
    for (var i = 0; i < str.length; i += 1) {
      if (icount <= len - 1) {
        temp = str.substr(i, 1);

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
    return strre + '...';
  },

  discriCard: function discriCard(id) {
    var result = {};
    var UUserCard = id;
    result.date = UUserCard.substring(6, 10) + '-' + UUserCard.substring(10, 12) + '-' + UUserCard.substring(12, 14);
    if (parseInt(UUserCard.substr(16, 1), 10) % 2 === 1) {
      result.sex = '男';
    } else {
      result.sex = '女';
    }
    return result;
  },

  checkDate: function checkDate(val) {
    var a = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!a.test(val)) {
      return false;
    }
    return true;
  },

  randomPassword: function randomPassword(size) {
    var seed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7', '8', '9'];
    var seedlength = seed.length;
    var createPassword = '';
    var j = void 0;
    for (var i = 0; i < size; i++) {
      j = Math.floor(Math.random() * seedlength);
      createPassword += seed[j];
    }
    return createPassword;
  },

  myRegExp: {
    isQQ: function isQQ(str) {
      var reg = /^[1-9][0-9]{4,9}$/gim;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isPhone: function isPhone(str) {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isEmail: function isEmail(str) {
      var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isNumber: function isNumber(str) {
      var reg = /^\d+$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isChinese: function isChinese(str) {
      var reg = /[\u4e00-\u9fa5]/gm;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isPostcode: function isPostcode(str) {
      var reg = /^[1-9]\d{5}$/g;

      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isIDcard: function isIDcard(str) {
      var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isURL: function isURL(str) {
      var reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isDate: function isDate(str) {
      var reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
      if (reg.test(str)) {
        return true;
      }
      return false;
    },
    isIP: function isIP(str) {
      var reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
      if (reg.test(str)) {
        return true;
      }
      return false;
    }
  },
  pick: function pick(obj, keys, emp) {
    return keys.map(function (k) {
      return k in obj ? _defineProperty({}, k, obj[k]) : emp ? _defineProperty({}, k, '') : {};
    }).reduce(function (res, o) {
      return (0, _assign2.default)(res, o);
    }, {});
  },
  reject: function reject(obj, keys) {
    return (0, _keys2.default)(obj).filter(function (k) {
      return !keys.includes(k);
    }).map(function (k) {
      return _defineProperty({}, k, obj[k]);
    }).reduce(function (res, o) {
      return (0, _assign2.default)(res, o);
    }, {});
  },
  convertCurrency: convertCurrency
};
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);

  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}

function convertCurrency(money) {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');

  var cnIntRadice = new Array('', '拾', '佰', '仟');

  var cnIntUnits = new Array('', '万', '亿', '兆');

  var cnDecUnits = new Array('角', '分', '毫', '厘');

  var cnInteger = '整';

  var cnIntLast = '元';

  var maxNum = 999999999999999.9999;

  var integerNum = void 0;

  var decimalNum = void 0;

  var chineseStr = '';

  var parts = void 0;
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }

  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }

  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }

        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }

  if (decimalNum != '') {
    var decLen = decimalNum.length;
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