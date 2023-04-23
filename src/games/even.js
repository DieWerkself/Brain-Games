import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'Answer "yes" if the number is even, otherwise answer "no".';

const isEven = (number) => number % 2;

const getEvenNumber = () => {
  const randomNumber = getRandomNumber(1, 50);
  const answer = isEven(randomNumber) ? 'no' : 'yes';
  return [answer, randomNumber];
};

export default () => {
  runMainLogic(description, getEvenNumber);
};
