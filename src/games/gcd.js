import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'Find the greatest common divisor of given numbers.';

const findGcd = (num1, num2) => {
  let a = num1;
  let b = num2;

  while (a !== b) {
    if (a > b) {
      a -= b;
    } else {
      b -= a;
    }
  }

  return a;
};

const getGcd = () => {
  const number1 = getRandomNumber(1, 50);
  const number2 = getRandomNumber(1, 50);
  const question = `${number1} ${number2}`;
  const answer = findGcd(number1, number2);
  return [answer.toString(), question];
};

export default () => {
  runMainLogic(description, getGcd);
};
