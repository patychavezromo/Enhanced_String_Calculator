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

function parseNumbersWithDelimiter(delimiters, stringNumbers) {
  let newStringNumbers = '';
  for (let i = 0; i < stringNumbers.length; i++) {
    const isDelimiter = delimiters.has(stringNumbers[i]);
    if (isDelimiter) {
      newStringNumbers += ',';
    }
    if (!isDelimiter) {
      newStringNumbers += stringNumbers[i];
    }
  }
  let arrayStringNumbers = newStringNumbers.split(',');
  const numbers = arrayStringNumbers
    .map((stringNumber) => parseInt(stringNumber))
    .filter((num) => !isNaN(num));
  return numbers;
}

function getDelimiters(inputString) {
  const endIndex = inputString.indexOf('\\n');
  const delimiterString = inputString.substring(2, endIndex);
  let allDelimiterString = new Set();
  for (let i = 0; i < delimiterString.length; i++) {
    if (
      delimiterString[i] !== '[' &&
      delimiterString[i] !== ']' &&
      delimiterString[i] !== ' '
    ) {
      allDelimiterString.add(delimiterString[i]);
    }
  }
  return allDelimiterString;
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
  add: (inputString) => {
    if (inputString === '') {
      return 0;
    }
    let numbers = [];
    if (inputString.startsWith('//')) {
      const delimiters = getDelimiters(inputString);
      const startIndexOfNumbersString = inputString.indexOf('\\n') + 2;
      const stringNumbers = inputString.substring(
        startIndexOfNumbersString,
        inputString.length
      );
      numbers = parseNumbersWithDelimiter(delimiters, stringNumbers);
    }
    if (!inputString.startsWith('//')) {
      numbers = parseNumbers(inputString);
    }
    const numbersUnder1000 = numbers.filter((number) => number <= 1000);
    try {
      return getSum(numbersUnder1000);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },
};

export default mathFunction;
