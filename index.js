import readlineSync from 'readline-sync';

export default (name, game) => {
  for (let i = 0; i < 3; i += 1) {
    const [correctAnswer, question] = game();

    console.log(`Question: ${question}`);
    const answer = readlineSync.question('Your answer: ');
    if (answer === correctAnswer) {
      console.log('Correct!');
    } else {
      return console.log(
        `${answer} is wrong answer ;(. Correct answer was ${correctAnswer}.\nLet's try again, ${name}!`,
      );
    }
  }
  return console.log(`Congratulations, ${name}!`);
};

export const random = (num = 100, plus = 0) => Math.trunc(Math.random() * num + plus);
