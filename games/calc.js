import mainLogic from '../index.js';

export default (name) => {
	console.log('What is the result of the expression?');
	const operations = ['+', '-', '*'];
	const random = (num = 100) => Math.trunc(Math.random() * num);
	const mathAction = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
	};

	const makeRandom = () => {
		const randomFirstInt = random();
		const randomSecondInt = random();
		const randomOperator = operations[random(operations.length)];
		const question = `${randomFirstInt} ${randomOperator} ${randomSecondInt}`;
		const correctAnswer = mathAction[randomOperator](
			randomFirstInt,
			randomSecondInt
		).toString();
		return [correctAnswer, question];
	};

	return mainLogic(name, makeRandom);
};
