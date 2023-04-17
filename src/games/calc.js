import mainLogic, { random } from '../../index.js';

export default (name) => {
  console.log('What is the result of the expression?');
  const operations = ['+', '-', '*'];
  const mathAction = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
  };

  const getRandomExpression = () => {
    const randomFirstInt = random();
    const randomSecondInt = random();
    const randomOperator = operations[random(operations.length)];
    const question = `${randomFirstInt} ${randomOperator} ${randomSecondInt}`;
    const correctAnswer = mathAction[randomOperator](
      randomFirstInt,
      randomSecondInt
    );
    return [correctAnswer.toString(), question];
  };

  return mainLogic(name, getRandomExpression);
};
