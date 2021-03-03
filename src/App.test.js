
import {calcMe} from './App'

describe('App', () => {
  let expression;
  it ('evaluates the expression correctly', () => {
    expression = '2+3+4-4*3'
    expect(calcMe(expression)).toBe(-3);

    expression = '3+4'
    expect(calcMe(expression)).toBe(7);

    expression = '9'
    expect(calcMe(expression)).toBe(9);

    expression = '0.5+2.3'
    expect(calcMe(expression)).toBe(2.8);
  })

  it ('evaluates expressions starting with a "-" operator', () => {
    expression = '30'
    expect(calcMe(expression)).toBe(30);
  })

  it ('evaluates longer expressions starting with a "-" operator', () => {
    expression = '30-6'
    expect(calcMe(expression)).toBe(24);

    expression = '5.3-0.5'
    expect(calcMe(expression)).toBe(4.8)
  })



  it ('ignores trailing operators while evaluating the expression correctly', () => {
    expression = '2+3+4-4*3'
    expect(calcMe(expression)).toBe(-3);
  })


})