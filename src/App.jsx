import { useState } from 'react';
import './App.css';
import mathFunction from './mathFunction';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const processInput = () => {
    const stringNumbers = inputValue.trim();
    try {
      setResult(`Result: ${mathFunction.add(stringNumbers)}`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Enhanced String Calculator</h1>
      <p>
        <b> Instructions: </b> Enter no number, one number, or multiple numbers
        separated by any delimiter (e.g., comma, space, semicolon, new line,
        etc.). :
      </p>
      <input
        id="input"
        type="text"
        placeholder="Write your numbers here."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={processInput} className="btn">
        Process data
      </button>
      <div id="result">{result}</div>
    </>
  );
}

export default App;
