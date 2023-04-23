import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'What number is missing in the progression?';

const buildProgression = (randomNumber, progressionLength, randomStepValue) => {
  let startNumber = randomNumber;
  const progressionArray = [];

  for (let i = 0; i < progressionLength; i += 1) {
    startNumber += randomStepValue;
    progressionArray.push(startNumber);
  }

  return progressionArray;
};

const getProgression = () => {
  const randomNumber = getRandomNumber(1, 50);
  const progressionLength = getRandomNumber(5, 10);
  const randomStepValue = getRandomNumber(1, 10);
  const randomIndex = getRandomNumber(0, progressionLength - 1);
  const question = buildProgression(randomNumber, progressionLength, randomStepValue);
  const correctAnswer = question[randomIndex];
  question[randomIndex] = '..';
  return [correctAnswer.toString(), question.join(' ')];
};

export default () => {
  runMainLogic(description, getProgression);
};
