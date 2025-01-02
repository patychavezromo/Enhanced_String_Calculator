function parseNumbers(stringNumbers) {
  const arrayStrings = stringNumbers.split(',');
  const allStringsNumbers = arrayStrings.flatMap((string) =>
    string.split('\\n')
  );
  const numbers = allStringsNumbers
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
    return numbers.reduce(
      (accumulator, currentNumber) => accumulator + currentNumber,
      0
    );
  },
};

export default mathFunction;
