import React, { useState } from "react";
import Layout from "../../components/layout";
const Dice = () => {
  const [diceString, setDiceString] = useState("");
  const [diceOutput, setDiceOutput] = useState(0);
  const [diceAvg, setDiceAvg] = useState(0);
  const [diceArray, setDiceArray] = useState([]);
  const [cocked, setCocked] = useState(false);

  /**
   * WARNING: RESOURCE INTENSIVE / EXPONTENTIALLY COMPLEX (O(n^m), where m is # of dice and n is dice size)
   * @param {*} arr The array of dice sizes (e.g. [8, 8, 6] for chaos bolt damage)
   * @param {*} sum The rolling sum. When manually calling, pass in your modifier value (e.g. for 2d4+2, pass in 2)
   * @param {*} dist An empty object that will store the roll's distribution data. for 2d6,
   * it would look like {2:1, 3: 2, ... 7: 6 ... 11: 2, 12: 1}
   */
  const nDimensionalIterate = (arr, sum, dist) => {
    const newArr = [...arr];
    const current = newArr.pop();
    for (let i = 1; i < current + 1; i += 1) {
      if (newArr.length === 0) {
        if (!dist[sum + i]) {
          dist[sum + i] = 1;
        } else {
          dist[sum + i] = 1 + dist[sum + i];
        }
      }
      nDimensionalIterate(newArr, sum + i, dist);
    }
  };
  const dist = {};
  nDimensionalIterate(diceArray, 0, dist);
  console.log(dist);
  console.log(diceArray);

  /**
   * Takes in a specially formatted string and returns the average roll and a random roll
   * @param {string} str e.g. "1d6+2d8+4"
   */
  const parseDiceString = str => {
    let newDiceArray = [];
    const dice = str.split("+").map(x => x.trim());
    let sum = 0;
    let avg = 0;
    dice.forEach(die => {
      if (/\dd\d/.test(die)) {
        let vals = die.split("d");
        for (let i = 0; i < parseInt(vals[0]); i += 1) {
          newDiceArray.push(parseInt(vals[1]));
          sum += Math.ceil(Math.random() * parseInt(vals[1]));
          avg += (parseInt(vals[1]) + 1) / 2;
        }
      } else if (/\d/.test(die)) {
        sum += parseInt(die);
        avg += parseInt(die);
      }
      setDiceArray(newDiceArray);
    });
    setDiceAvg(avg);
    if (Math.ceil(Math.random() * 1000) > 995) {
      setCocked(true);
    } else {
      setCocked(false);
    }
    return sum;
  };

  // the number of total unique rolls, used for finding percent chance of a particular value
  const sum = Object.keys(dist)
    .map(k => dist[k])
    .reduce((a, b) => a + b, 0);
  return (
    <Layout>
      <p>
        Write your dice input like "1d6+3d8+3", and click "roll" to generate a
        result.
      </p>
      <p>
        tip: for XdY, calculate Y^X. If it's a number over a million, your tab
        will probably freeze.
      </p>
      <input
        type="text"
        value={diceString}
        onChange={e => setDiceString(e.target.value)}
      />
      <button onClick={() => setDiceOutput(parseDiceString(diceString))}>
        roll
      </button>
      <div>
        Output:{" "}
        {cocked ? "Oops, one of the dice is cocked. Reroll." : diceOutput}
      </div>
      <div>Min Roll: {Math.min(...Object.keys(dist))}</div>
      <div>Max Roll: {Math.max(...Object.keys(dist))}</div>
      <div>Average Roll: {diceAvg}</div>
      <div>Probability distribution (out of {sum} possible rolls):</div>
      <ul>
        {Object.keys(dist).map(i => (
          <li>
            {i}: {Math.round((dist[i] / sum) * 1000) / 10}%
            {/* {i}: {dist[i]} */}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Dice;
