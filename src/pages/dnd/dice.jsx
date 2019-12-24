import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Chart from "chart.js";

const toPercent = p => {
  return parseInt(p * 100 * 10) / 10;
};

const generateDie = sides => {
  const newDie = {};
  for (let i = 1; i < sides + 1; i += 1) {
    newDie[i] = 1;
  }
  return newDie;
};

const d = generateDie;

const multiplyPolynomials = (poly1, poly2) => {
  const product = {};
  const poly1keys = Object.keys(poly1).map(x => parseInt(x));
  const poly2keys = Object.keys(poly2).map(x => parseInt(x));
  for (let i in poly1keys) {
    for (let j in poly2keys) {
      const newIndex = poly1keys[i] + poly2keys[j];
      if (!product[newIndex] && product[newIndex] !== 0) {
        product[newIndex] = 0;
      }
      product[newIndex] += poly1[poly1keys[i]] * poly2[poly2keys[j]];
    }
  }
  return product;
};

const generateDistribution = diceArray => {
  const newArray = [...diceArray];
  if (newArray.length === 1) {
    return d(newArray[0]);
  }
  let dist = d(newArray.pop());
  while (newArray.length > 0) {
    dist = multiplyPolynomials(dist, d(newArray.pop()));
  }
  return dist;
};

const Dice = () => {
  const [diceString, setDiceString] = useState("");
  const [diceOutput, setDiceOutput] = useState(0);
  const [diceAvg, setDiceAvg] = useState(0);
  const [diceArray, setDiceArray] = useState([]);
  const [cocked, setCocked] = useState(false);
  const [dist, setDist] = useState({});
  const [sum, setSum] = useState(0);

  useEffect(() => {
    let newDist = generateDistribution(diceArray);
    setDist(newDist);
    const sum = Object.values(newDist).reduce((a, b) => a + b, 0);
    setSum(sum);
  }, [diceArray]);

  useEffect(() => {
    let ctx = document.getElementById("distChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [...Object.keys(dist)],
        datasets: [
          {
            label: "Dice Roll Probabilities",
            data: [
              ...Object.values(dist).map(x => toPercent(parseInt(x) / sum)),
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [dist, sum]);

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
      <canvas id="distChart" width="400" height="400"></canvas>
      <ul>
        {Object.keys(dist).map(i => (
          <li>
            {i}: {dist[i]}/{sum} | {((dist[i] / sum) * 1000) / 10}%
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Dice;
