import runMainLogic from '../index.js';
import randomNumber from '../lib.js';

const rule = 'What is the result of the expression?';

export default () => {
  const operations = ['+', '-', '*'];
  const maxOperationsIndex = operations.length - 1;

  const doMathCalc = (operator, a, b) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      default:
        return '';
    }
  };

  const getRandomExpression = () => {
    const number1 = randomNumber(1, 50);
    const number2 = randomNumber(1, 50);
    const randomOperator = operations[randomNumber(0, maxOperationsIndex)];
    const question = `${number1} ${randomOperator} ${number2}`;
    const correctAnswer = doMathCalc(randomOperator, number1, number2);
    return [correctAnswer.toString(), question];
  };

  runMainLogic(rule, getRandomExpression);
};
