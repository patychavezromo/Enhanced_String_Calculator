function parseNumbers(stringNumbers) {
  const arrayStrings = stringNumbers.split(',');
  const allNumberStrings = arrayStrings.flatMap((string) =>
    string.split('\\n')
  );
  const numbers = allNumberStrings
    .map((stringNumber) => parseInt(stringNumber))
    .filter((num) => !isNaN(num));
  return numbers;
}

function parseNumbersWithDelimiter(delimiter, stringNumbers) {
  const startIndex = stringNumbers.indexOf('\\n');
  const newNumbersString = stringNumbers.substring(
    startIndex + 2,
    stringNumbers.length
  );
  const allNumberStrings = newNumbersString.split(delimiter);
  const numbers = allNumberStrings
    .map((stringNumber) => parseInt(stringNumber))
    .filter((num) => !isNaN(num));
  return numbers;
}

function getDelimiter(stringNumber) {
  const endIndex = stringNumber.indexOf('\\n');
  return stringNumber.substring(2, endIndex);
}

function checkForNegatives(numbers) {
  return numbers.filter((number) => {
    return number < 0;
  });
}

function getSum(numbers) {
  const negatives = checkForNegatives(numbers);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(',')}`);
  }
  return numbers.reduce(
    (accumulator, currentNumber) => accumulator + currentNumber,
    0
  );
}

const mathFunction = {
  add: (stringNumbers) => {
    if (stringNumbers === '') {
      return 0;
    }
    let numbers = [];
    if (stringNumbers.startsWith('//')) {
      const delimiter = getDelimiter(stringNumbers);
      numbers = parseNumbersWithDelimiter(delimiter, stringNumbers);
    }
    if (!stringNumbers.startsWith('//')) {
      numbers = parseNumbers(stringNumbers);
    }
    try {
      return getSum(numbers);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
};

export default mathFunction;
