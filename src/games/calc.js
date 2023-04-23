import runMainLogic from '../index.js';
import getRandomNumber from '../lib.js';

const description = 'What is the result of the expression?';

const calculate = (operator, a, b) => {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    default:
      throw new Error(`Error: ${operator}`);
  }
};

const generateRound = () => {
  const operators = ['+', '-', '*'];
  const number1 = getRandomNumber(1, 50);
  const number2 = getRandomNumber(1, 50);
  const randomOperator = operators[getRandomNumber(0, operators.length - 1)];
  const question = `${number1} ${randomOperator} ${number2}`;
  const answer = calculate(randomOperator, number1, number2);
  return [answer.toString(), question];
};

export default () => {
  runMainLogic(description, generateRound);
};
