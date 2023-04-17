import mainLogic from '../index.js';

export default (name) => {
	console.log('Answer "yes" if given number is prime. Otherwise answer "no".');

	const checkPrimeNumber = () => {
		let isPrime = true;
		const randomNum = Math.trunc(Math.random() * 100);
		if (randomNum > 1) {
			for (let i = 2; i < randomNum; i += 1) {
				if (randomNum % i === 0) {
					isPrime = false;
					break;
				}
			}
		} else {
			isPrime = false;
		}

		const correctAnswer = isPrime ? 'yes' : 'no';

		return [correctAnswer, randomNum];
	};

	return mainLogic(name, checkPrimeNumber);
};
