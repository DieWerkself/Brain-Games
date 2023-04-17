import readlineSync from 'readline-sync';

export default () => {
	console.log('Welcome to the Brain Games!');
	let userName = readlineSync.question('May I have your name? ');
	if (!userName.trim()) userName = 'John Doe';
	console.log(`Hello, ${userName}!`);
	return userName;
};
