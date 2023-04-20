import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'Find the greatest common divisor of given numbers.';

const findGcd = (num1, num2) => {
  while (num1 !== num2) {
    if (num1 > num2) {
      num1 -= num2;
    } else {
      num2 -= num1;
    }
  }

  return num1;
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
