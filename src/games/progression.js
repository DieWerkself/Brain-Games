import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'What number is missing in the progression?';

const buildProgression = (startNumber, length, step) => {
  const progressionArray = [];

  for (let i = 0; i < length; i += 1) {
    startNumber += step;
    progressionArray.push(startNumber);
  }

  return progressionArray;
};

const getProgression = () => {
  const randomNumber = getRandomNumber(1, 50);
  const progressionLength = getRandomNumber(5, 10);
  const randomStepValue = getRandomNumber(1, 10);
  const progression = buildProgression(randomNumber, progressionLength, randomStepValue);
  const randomIndex = getRandomNumber(0, progression.length - 1);
  const answer = progression[randomIndex];
  progression[randomIndex] = '..';
  return [answer.toString(), progression.join(' ')];
};

export default () => {
  runMainLogic(description, getProgression);
};
