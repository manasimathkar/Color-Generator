import React, { useState } from "react";
import SingleColor from "./SingleColor";
import { BsSearch } from "react-icons/bs";
import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(0);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [list, setList] = useState(new Values("#adb5bd").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError2(true);
    } else {
      setError2(false);
      try {
        setError1(false);
        let colors = new Values(color).all(amount);
        setList(colors);
      } catch (error1) {
        setError1(true);
        console.log(error1);
      }
    }
  };

  return (
    <>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <h2>Color Generator</h2>
          <h3>Color:</h3>
          <input
            type="text"
            value={color}
            placeholder="#adb5bd"
            onChange={(e) => setColor(e.target.value)}
            className={`${error1 ? "error" : null}`}
          />
          <h3>Percent:</h3>
          <input
            type="number"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className={`${error2 ? "error" : null}`}
          />
          <button type="submit" className="btn">
            <BsSearch></BsSearch>
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
