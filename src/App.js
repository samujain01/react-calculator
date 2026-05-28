import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [input, setInput] = useState("");
const [history, setHistory] = useState([]);
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = () => {
  try {
    const result = eval(input).toString();

    setHistory((prev) => [...prev, `${input} = ${result}`]);

    setInput(result);
  } catch {
    setInput("Error");
  }
};

  const clear = () => {
    setInput("");
  };

  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (!isNaN(key) || "+-*/.".includes(key)) {
        setInput((prev) => prev + key);
      }

      if (key === "Enter") {
        calculate();
      }

      if (key === "Backspace") {
        backspace();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator">
      <h1>Calculator</h1>

      <input type="text" value={input} readOnly />

      <div className="buttons">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("*")}>*</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={backspace}>⌫</button>

        <button className="clear" onClick={clear}>
          Clear
        </button>
      </div>
      <div className="history">
  <h2>History</h2>

  {history.map((item, index) => (
    <p key={index}>{item}</p>
  ))}
</div>
    </div>
  );
}

export default App;