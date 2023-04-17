import mainLogic, { random } from '../../index.js';

export default (name) => {
  console.log('Find the greatest common divisor of given numbers.');

  const getGcd = () => {
    let firstInt = random();
    let secondInt = random();
    const question = `${firstInt} ${secondInt}`;
    while (firstInt !== secondInt) {
      if (firstInt > secondInt) {
        firstInt -= secondInt;
      } else {
        secondInt -= firstInt;
      }
    }
    return [firstInt.toString(), question];
  };

  return mainLogic(name, getGcd);
};
