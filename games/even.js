import mainLogic, { getARange } from '../index.js';

export default (name) => {
	console.log('Answer "yes" if the number is even, otherwise answer "no".');
	const [min, max] = getARange();
	const makeRandomInt = () => {
		const randomInt = Math.trunc(Math.random() * (max - min) + min);
		const correctAnswer = randomInt % 2 ? 'no' : 'yes';
		return [correctAnswer, randomInt];
	};
	return mainLogic(name, makeRandomInt);
};
