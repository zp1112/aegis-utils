import chai from 'chai';
import utils from '../index.js';

const expect = chai.expect;
// convertCurrency
describe('convertCurrency：转换大金额大写', () => {
  describe('大数字金额', () => {
    it('should return 壹拾兆零贰佰亿元伍角陆分', () => {
      expect(utils.convertCurrency(10020000000000.56)).to.eq('壹拾兆零贰佰亿元伍角陆分');
    })
  });
  describe('小数字金额', () => {
    it('should return 壹仟零贰元整', () => {
      expect(utils.convertCurrency(1002)).to.eq('壹仟零贰元整');
    })
  });
});

// isNumber
describe('isNumber：检查字符串是否是数字', () => {
  describe('字符串', () => {
    it('should return false', () => {
      expect(utils.myRegExp.isNumber('hello')).to.eq(false);
    })
  });
  describe('数字', () => {
    it('should return true', () => {
      expect(utils.myRegExp.isNumber(1002)).to.eq(true);
    })
  });
  describe('字符串数字', () => {
    it('should return false', () => {
      expect(utils.myRegExp.isNumber('1002')).to.eq(true);
    })
  });
  describe('进制数', () => {
    it('should return true', () => {
      expect(utils.myRegExp.isNumber(0x80)).to.eq(true);
    })
  });
  describe('NaN', () => {
    it('should return false', () => {
      expect(utils.myRegExp.isNumber(NaN)).to.eq(false);
    })
  });
});
// subList
describe('subList: 截取数组并返回下次截取的位置', () => {
  const list = [1,2,3,4,5,6,7,8];
  describe('per=0,curIndex=0', () => {
    it('should return { nextList: [], nextIndex: 0 }', () => {
      const curIndex = 0;
      const per = 0;
      expect(utils.subList(list, curIndex, per).nextList.length).to.eq(0);
      expect(utils.subList(list, curIndex, per).nextIndex).to.eq(0);
    })
  });
  describe('per=1,curIndex=-1', () => {
    it('should return { nextList: [], nextIndex: 0 }', () => {
      const curIndex = -1;
      const per = 1;
      expect(utils.subList(list, curIndex, per).nextList.length).to.eq(0);
      expect(utils.subList(list, curIndex, per).nextIndex).to.eq(0);
    })
  });
  describe('per=2,curIndex=0', () => {
    it('should return { nextList: [1,2], nextIndex: 2 }', () => {
      const curIndex = 0;
      const per = 2;
      expect(utils.subList(list, curIndex, per).nextList.length).to.eq(2);
      expect(utils.subList(list, curIndex, per).nextIndex).to.eq(2);
    })
  });
  describe('per=2,curIndex=7', () => {
    it('should return { nextList: [8], nextIndex: 0 }', () => {
      const curIndex = 7;
      const per = 2;
      expect(utils.subList(list, curIndex, per).nextList.length).to.eq(1);
      expect(utils.subList(list, curIndex, per).nextIndex).to.eq(0);
    })
  });
});
// trim
describe('trim:去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格', () => {
  describe('所有空格', () => {
    it('should return "hello"', () => {
      expect(utils.trim('  hel lo ', 1)).to.eq('hello');
    })
  });
  describe('前后空格', () => {
    it('should return "he  llo"', () => {
      expect(utils.trim(' he  llo ', 2)).to.eq('he  llo');
    })
  });
  describe('前空格', () => {
    it('should return "he  llo"', () => {
      expect(utils.trim(' he  llo', 3)).to.eq('he  llo');
    })
  });
  describe('后空格', () => {
    it('should return "he  llo"', () => {
      expect(utils.trim('he  llo ', 4)).to.eq('he  llo');
    })
  });
});
// replaceAll
describe('replaceAll:替换所有字符', () => {
  describe('替换字符', () => {
    it('should return heLLo worLd', () => {
      expect(utils.replaceAll('hello world', 'l', 'L')).to.eq('heLLo worLd');
    })
  });
  describe('替换数字', () => {
    it('should return hello world', () => {
      expect(utils.replaceAll('hello 123', 123, 'world')).to.eq('hello world');
    })
  });
});
// countNum
describe('countNum:找出字符串中字符数最多的那个字符,不包括空格', () => {
  describe('找出字符串中字符数最多的那个字符', () => {
    it('should return l', () => {
      expect(utils.countNum('hello world')[0]).to.eq('l');
    })
  });
  describe('有相同个数的最多的字符串', () => {
    it('should return 3', () => {
      expect(utils.countNum('hh ee llo').length).to.eq(3);
    })
  });
});
// cutstr
describe('cutstr:字符串截取并在末尾添加...，汉字或者全角的话算2个字节', () => {
  describe('字符串截取8位,包含汉字', () => {
    it('should return "你好,h e..."', () => {
      expect(utils.cutstr('你好,h ello', 8)).to.eq('你好,h e...');
    })
  });
  describe('字符串截取8位,不包含汉字', () => {
    it('should return "hello wo..."', () => {
      expect(utils.cutstr('hello world', 8)).to.eq('hello wo...');
    })
  });
});