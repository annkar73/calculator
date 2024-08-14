import React, { useState } from "react";
import { evaluate } from "mathjs";
import './App.css';

function App() {
  return (
    <div className="app">
      <Calculator />
    </div>
  );
}

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        const sanitizedInput = input.replace(/\s+/g, '');
        const result = evaluate(sanitizedInput);
        setInput(result.toString());
      } catch(error) {
        console.error("Error evaluating expression:", error.message);
        setInput("Error"); 
      }
    } else if (value === "C") {
        setInput("");
    } else {
        setInput(input + value);
    }
  }; 

  return (
    <div className="calculator">
      <Display value={input} />
      <Keypad onClick={handleClick} />
    </div>
  );
}

function Display({ value }) {
  return <div className="display">{value}</div>;
}

function Keypad({ onClick }) {
  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C"
  ];

  return (
    <div className="keypad">
      {buttons.map((button, index) => (
        <button key={index} onClick={() => onClick(button)}>
          {button}
        </button>
      ))}
    </div>
  );
}

export default App;
