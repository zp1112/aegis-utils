import test from 'ava';
import chai from 'chai';
import utils from '../index.js';

const expect = chai.expect;
// convertCurrency
test('convertCurrency：转换大金额大写', t => {
  console.log(111111111, utils.convertCurrency(10020000000000.56));
  t.is(utils.convertCurrency(10020000000000.56), '壹拾兆零贰佰亿元伍角陆分');
});
// describe('convertCurrency：转换大金额大写', () => {
//   describe('大数字金额', () => {
//     it('should return 壹拾兆零贰佰亿元伍角陆分', () => {
//       expect(utils.convertCurrency(10020000000000.56)).to.eq('壹拾兆零贰佰亿元伍角陆分');
//     })
//   });
//   describe('小数字金额', () => {
//     it('should return 壹仟零贰元整', () => {
//       expect(utils.convertCurrency(1002)).to.eq('壹仟零贰元整');
//     })
//   });
// });