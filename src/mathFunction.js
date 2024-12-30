function parseNumbers(stringNumbers) {
  const numbers = stringNumbers
    .split(',')
    .map((stringNumber) => parseInt(stringNumber))
    .filter((num) => !isNaN(num));
  return numbers;
}

const mathFunction = {
  add: (stringNumbers) => {
    if (stringNumbers === '') {
      return 0;
    }
    const numbers = parseNumbers(stringNumbers);
    if (numbers.length === 1) {
      return numbers[0];
    }
    return numbers[0] + numbers[1];
  },
};

export default mathFunction;
