'use client';
import { useState } from "react";

export default function Home() {
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        // Check for division by zero
        if (expression.includes('/0')) {
          setExpression('Error');
          return;
        }

        // Evaluate the expression
        const evalResult = eval(expression.replace(/x/g, '*')).toString();
        setExpression(evalResult);  // Show result in the same expression field
      } catch (error) {
        setExpression('Error');
      }
    } else if (value === 'RESET') {
      setExpression('');  // Clear everything
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));  // Remove the last character
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  // List of buttons
  const buttons = [
    '7', '8', '9', 'DEL',
    '4', '5', '6', '+',
    '1', '2', '3', '-',
    '.', '0', '/', 'x'
  ];

  return (
    <main className="flex flex-col gap-8 items-center justify-center h-screen bg-white-900">
      {/* Display box */}
      <div className="bg-gray-800 text-white text-right p-4 rounded-lg shadow-lg w-full max-w-sm text-3xl mb-4 h-20">
        {expression || '0'}
      </div>

      {/* Buttons container */}
      <div className="grid grid-cols-4 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleButtonClick(btn)}
            className={`bg-gray-200 hover:bg-gray-400 p-4 rounded-lg flex items-center justify-center h-16 text-xl font-bold ${
              btn === 'DEL' ? 'bg-blue-700 hover:bg-gray-600 text-white' : ''
            }`}
          >
            {btn}
          </button>
        ))}
        {/* RESET button */}
        <button
          onClick={() => handleButtonClick('RESET')}
          className="col-span-2 bg-blue-700 hover:bg-gray-600 p-4 rounded-lg flex items-center justify-center h-16 text-xl font-bold text-white"
        >
          RESET
        </button>

        {/* Equals button */}
        <button
          onClick={() => handleButtonClick('=')}
          className="col-span-2 bg-red-500 hover:bg-red-600 p-4 rounded-lg flex items-center justify-center h-16 text-xl font-bold"
        >
          =
        </button>
      </div>
    </main>
  );
}
