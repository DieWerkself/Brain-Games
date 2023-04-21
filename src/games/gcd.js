import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'Find the greatest common divisor of given numbers.';

const findGcd = (num1, num2) => {
  let a = num1;
  let b = num2;

  while (a !== num2) {
    if (a > b) {
      a -= b;
    } else {
      b -= a;
    }
  }

  return a;
};

export default () => {
  const getGcd = () => {
    const number1 = randomNumber(1, 50);
    const number2 = randomNumber(1, 50);
    const question = `${number1} ${number2}`;
    const correctAnswer = findGcd(number1, number2);
    return [correctAnswer.toString(), question];
  };

  runMainLogic(rule, getGcd);
};
