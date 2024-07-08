import React, { useState } from 'react';

const buttons = [
  ['AC', '±', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const scientificButtons = [
  ['sin', 'cos', 'tan', 'ln'],
  ['√', '^', 'π', 'e'],
  ['(', ')', 'log', 'exp'],
];

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<string>('');

  const handleButtonClick = (value: string) => {
    if (value === 'AC') {
      setDisplay('0');
      setMemory('');
      return;
    }

    if (value === '±') {
      setDisplay((prev) => (prev[0] === '-' ? prev.slice(1) : '-' + prev));
      return;
    }

    if (value === '=') {
      try {
        setDisplay(eval(memory + display).toString());
        setMemory('');
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (['/', '*', '-', '+'].includes(value)) {
      setMemory(display + value);
      setDisplay('0');
      return;
    }

    setDisplay((prev) => (prev === '0' ? value : prev + value));
  };

  const handleScientificButtonClick = (value: string) => {
    let result = '';

    try {
      switch (value) {
        case 'sin':
          result = Math.sin(eval(display)).toString();
          break;
        case 'cos':
          result = Math.cos(eval(display)).toString();
          break;
        case 'tan':
          result = Math.tan(eval(display)).toString();
          break;
        case 'ln':
          result = Math.log(eval(display)).toString();
          break;
        case '√':
          result = Math.sqrt(eval(display)).toString();
          break;
        case '^':
          setMemory(display + '**');
          setDisplay('0');
          return;
        case 'π':
          result = (Math.PI).toString();
          break;
        case 'e':
          result = (Math.E).toString();
          break;
        case 'log':
          result = Math.log10(eval(display)).toString();
          break;
        case 'exp':
          result = Math.exp(eval(display)).toString();
          break;
        default:
          break;
      }
      setDisplay(result);
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator bg-white  p-4 rounded-lg shadow-lg">
      <div className="display bg-gray-700 text-white p-4 mb-4 rounded text-right text-2xl">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4 text-white">
        {buttons.flat().map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className={`bg-gray-700 hover:bg-gray-600 p-4 rounded ${value === '=' ? 'col-span-2' : ''}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 text-white">
        {scientificButtons.flat().map((value) => (
          <button
            key={value}
            onClick={() => handleScientificButtonClick(value)}
            className="bg-blue-700 hover:bg-blue-600 p-4 rounded"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
