import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'What number is missing in the progression?';

const buildProgression = () => {
  const progressionArray = [];
  let randomNum = randomNumber(1, 50);
  const progressionLength = randomNumber(5, 10);
  const randomStepValue = randomNumber(1, 10);
  const maxIndexValue = progressionLength - 1;
  const randomIndex = randomNumber(0, maxIndexValue);

  for (let i = 0; i < progressionLength; i += 1) {
    randomNum += randomStepValue;
    progressionArray.push(randomNum);
  }

  return [progressionArray, randomIndex];
};

export default () => {
  const getProgression = () => {
    const [question, randomIndex] = buildProgression();
    const correctAnswer = question[randomIndex];
    question[randomIndex] = '..';
    return [correctAnswer.toString(), question.join(' ')];
  };

  runMainLogic(rule, getProgression);
};
