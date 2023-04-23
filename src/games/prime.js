import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'Answer "yes" if given number is prime. Otherwise answer "no".';

const isPrime = (num) => {
  if (num <= 1) return false;

  for (let i = 2; i < num; i += 1) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const getPrimeNumber = () => {
  const randomNumber = getRandomNumber(1, 50);
  const answer = isPrime(randomNumber) ? 'yes' : 'no';
  return [answer, randomNumber];
};

export default () => {
  runMainLogic(description, getPrimeNumber);
};
