import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'Answer "yes" if the number is even, otherwise answer "no".';

export default () => {
  const getRandomNum = () => {
    const randomNum = randomNumber(1, 50);
    const isEven = (num) => num % 2;
    const correctAnswer = isEven(randomNum) ? 'no' : 'yes';
    return [correctAnswer, randomNum];
  };

  runMainLogic(rule, getRandomNum);
};
