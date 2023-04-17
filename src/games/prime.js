import mainLogic, { random } from '../../index.js';

export default (name) => {
  console.log('Answer "yes" if given number is prime. Otherwise answer "no".');

  const getPrimeNumber = () => {
    const randomNum = random();
    let isPrime = true;

    if (randomNum > 1) {
      for (let i = 2; i < randomNum; i += 1) {
        if (randomNum % i === 0) {
          isPrime = false;
          break;
        }
      }
    } else {
      isPrime = false;
    }

    const correctAnswer = isPrime ? 'yes' : 'no';

    return [correctAnswer, randomNum];
  };

  return mainLogic(name, getPrimeNumber);
};
