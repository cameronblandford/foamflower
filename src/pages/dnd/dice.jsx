import React, { useState } from "react";

const Dice = () => {
  const [diceString, setDiceString] = useState("");
  const [diceOutput, setDiceOutput] = useState(0);
  const [diceAvg, setDiceAvg] = useState(0);
  const parseDiceString = str => {
    const dice = str.split("+").map(x => x.trim());
    let sum = 0;
    let avg = 0;
    dice.forEach(die => {
      if (/\dd\d/.test(die)) {
        let vals = die.split("d");
        for (let i = 0; i < parseInt(vals[0]); i += 1) {
          sum += Math.ceil(Math.random() * parseInt(vals[1]));
          avg += (parseInt(vals[1]) + 1) / 2;
        }
      } else if (/\d/.test(die)) {
        sum += parseInt(die);
        avg += parseInt(die);
      }
    });
    setDiceAvg(avg);
    return sum;
  };
  return (
    <div>
      <p>
        Write your dice input like "1d6+3d8+3", and click "roll" to generate a
        result.
      </p>
      <input
        type="text"
        value={diceString}
        onChange={e => setDiceString(e.target.value)}
      />
      <button onClick={() => setDiceOutput(parseDiceString(diceString))}>
        roll
      </button>
      <div>Output: {diceOutput}</div>
      <div>Average Roll: {diceAvg}</div>
    </div>
  );
};

export default Dice;
