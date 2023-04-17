import readlineSync from 'readline-sync';
import mainLogic from '../index.js';

const getARange = () => {
	console.log(
		'Select a range of numbers to play(Only non-negative numbers allowed).'
	);
	let min = Math.trunc(readlineSync.question('From: '));
	let max = Math.trunc(readlineSync.question('To: '));
	if (min > max) {
		const temp = min;
		min = max;
		max = temp;
		console.log(
			`The From value must be less than To. We fixed it, now the value are equal: From = ${min}, To = ${max}`
		);
	} else if (!min || min < 0 || !max || max < 0 || max - min === 0) {
		min = 0;
		max = 100;
		console.log(
			`You have entered an invalid range. The values are set by default: From = ${min}, To = ${max}`
		);
	}
	return [min, max];
};

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
