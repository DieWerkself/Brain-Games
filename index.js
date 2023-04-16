import readlineSync from 'readline-sync';

export default (name, game) => {
	for (let i = 0; i < 3; i += 1) {
		const [correctAnswer, question] = game();

		console.log(`Question: ${question}`);
		const answer = readlineSync.question('Your answer: ');
		if (answer === correctAnswer) {
			console.log('Correct!');
		} else {
			return console.log(`${answer} is wrong answer ;(. Correct answer was ${correctAnswer}.`);
		}
	}
	return console.log(`Congratulations, ${name}!`);
};

export const getARange = () => {
	console.log('Select a range of numbers to play(Only non-negative numbers allowed).');
	let min = Math.trunc(readlineSync.question('From: '));
	let max = Math.trunc(readlineSync.question('To: '));
	if (min > max) {
		const temp = min;
		min = max;
		max = temp;
		console.log(`The From value must be less than To. We fixed it, now the value are equal: From = ${min}, To = ${max}`);
	} else if (!min || min < 0 || !max || max < 0 || max - min === 0) {
		min = 0;
		max = 100;
		console.log(`You have entered an invalid range. The values are set by default: From = ${min}, To = ${max}`);
	}
	return [min, max];
};
