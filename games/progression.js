import mainLogic from '../index.js';

export default (name) => {
	console.log('What number is missing in the progression?');
	const setProgression = () => {
		const numbersArray = [];
		let randomNum = Math.trunc(Math.random() * 100);
		const progressionLength = Math.trunc(Math.random() * 15 + 5);
		const randomIndex = Math.trunc(Math.random() * progressionLength);
		for (let i = 0; i < progressionLength; i += 1) {
			randomNum += randomIndex + 1;
			numbersArray.push(randomNum);
		}

		const hiddenNum = numbersArray[randomIndex];
		numbersArray[randomIndex] = '..';

		return [hiddenNum.toString(), numbersArray.toString()];
	};

	return mainLogic(name, setProgression);
};
