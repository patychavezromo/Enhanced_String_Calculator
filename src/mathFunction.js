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
  let splitStrings = [stringNumbers];
  for (let delimiter of delimiters) {
    splitStrings = splitStrings.flatMap((s) => s.split(delimiter));
  }
  const numbers = splitStrings
    .map((stringNumber) => parseInt(stringNumber))
    .filter((num) => !isNaN(num));
  return numbers;
}

function getDelimiters(inputString) {
  const endIndex = inputString.indexOf('\\n');
  const delimiterString = inputString.substring(2, endIndex);
  let currentDelimiter = '';
  let allDelimiterString = [];
  let hasOpeningBracket = false;
  for (
    let stringIndex = 0;
    stringIndex < delimiterString.length;
    stringIndex++
  ) {
    if (delimiterString[stringIndex] === '[') {
      currentDelimiter = '';
      hasOpeningBracket = true;
    }
    if (delimiterString[stringIndex] === ']') {
      if (hasOpeningBracket) {
        allDelimiterString.push(currentDelimiter);
        hasOpeningBracket = false;
      }
    }
    if (hasOpeningBracket && delimiterString[stringIndex] !== '[') {
      currentDelimiter = currentDelimiter + delimiterString[stringIndex];
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
