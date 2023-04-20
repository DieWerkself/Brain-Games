import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'Answer "yes" if given number is prime. Otherwise answer "no".';

const isPrime = (num) => {
  let condition = true;

  if (num > 1) {
    for (let i = 2; i < num; i += 1) {
      if (num % i === 0) {
        condition = false;
        break;
      }
    }
  } else {
    condition = false;
  }

  return condition;
};

export default () => {
  const getPrimeNumber = () => {
    const randomNum = randomNumber(1, 50);
    const correctAnswer = isPrime(randomNum) ? 'yes' : 'no';
    return [correctAnswer, randomNum];
  };

  runMainLogic(rule, getPrimeNumber);
};
