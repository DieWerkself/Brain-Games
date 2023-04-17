import mainLogic, { random } from '../../index.js';

export default (name) => {
	console.log('Answer "yes" if the number is even, otherwise answer "no".');

	const getRandomInt = () => {
		const randomInt = random(50);
		const correctAnswer = randomInt % 2 ? 'no' : 'yes';
		return [correctAnswer, randomInt];
	};
	return mainLogic(name, getRandomInt);
};
