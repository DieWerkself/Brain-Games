import mainLogic, { random } from '../../index.js';

export default (name) => {
	console.log('What number is missing in the progression?');

	const getProgression = () => {
		const question = [];
		let randomNum = random();

		const progressionLength = random(15, 5);
		const randomIndex = random(progressionLength);

		for (let i = 0; i < progressionLength; i += 1) {
			randomNum += randomIndex + 1;
			question.push(randomNum);
		}

		const correctAnswer = question[randomIndex];
		question[randomIndex] = '..';

		return [correctAnswer.toString(), question.join(' ')];
	};

	return mainLogic(name, getProgression);
};
