import { useState } from 'react';
import './App.css';
import mathFunction from './mathFunction';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const processInput = () => {
    const stringNumbers = inputValue.trim();
    if (stringNumbers === '') {
      setResult(mathFunction.add([]));
    }
    const allNumbers = stringNumbers.split(',').map(stringNumber => parseInt(stringNumber)).filter(num => !isNaN(num));
    setResult(mathFunction.add(allNumbers));
  };

  return (
    <>
      <h1>Enhanced String Calculator</h1>
      <p> <b> Instructions: </b> Enter no number, one number, or two numbers separated by a comma:</p>
      <input
        id="input"
        type="text"
        placeholder="Write your numbers here."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={processInput} className="btn">Process data</button>
      <div id="result">
        Result: {result}
      </div>
    </>
  );
}

export default App;
