import readlineSync from 'readline-sync';

export default (rule, game) => {
  console.log('Welcome to the Brain Games!');
  let userName = readlineSync.question('May I have your name? ');
  if (!userName.trim()) userName = 'John Doe';
  console.log(`Hello, ${userName}!`);
  console.log(rule);

  const numberOfRounds = 3;

  for (let i = 0; i < numberOfRounds; i += 1) {
    const [correctAnswer, question] = game();

    console.log(`Question: ${question}`);
    const answer = readlineSync.question('Your answer: ');

    if (answer !== correctAnswer) {
      console.log(`${answer} is wrong answer ;(. Correct answer was ${correctAnswer}.`);
      console.log(`Let's try again, ${userName}!`);
      return;
    }
    console.log('Correct!');
  }

  console.log(`Congratulations, ${userName}!`);
};
