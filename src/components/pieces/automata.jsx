import React, { useState, useEffect, useRef } from "react";
import { pick } from "../../util/templateBuilder";
import cloneDeep from "lodash/cloneDeep";
const coordWords = [
  "leopard",
  "chandelier",
  "crystal",
  "bleak",
  "joyous",
  "victor",
  "monument",
  "ossuary",
  "chamber",
  "grief",
  "kaleidoscope",
  "morning",
  "dew",
  "treefrog",
  "healthy",
  "leaving",
  "simple",
  "society",
  "mellow",
  "treesap",
  "syrup",
  "mothwing",
  "jaguar",
  "omen",
  "valley",
  "river",
  "heartache",
  "of",
  "and",
];

const blockLight = "░";
const blockMedium = "▒";
const blockDense = "▓";
const blockSolid = "█";

const randInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const elevate = tile => {
  switch (tile) {
    case blockLight:
      return blockMedium;
    case blockMedium:
      return blockDense;
    case blockDense:
      return blockSolid;
    case blockSolid:
      return blockSolid;
    default:
      return blockLight;
  }
};

const addIsland = someMap => {
  const MAX_ISLAND_DIAMETER = 10;
  const maxIslandWidth = MAX_ISLAND_DIAMETER;
  const maxIslandHeight = Math.floor(MAX_ISLAND_DIAMETER * (2 / 3));
  const mapWidth = someMap[0].length;
  const mapHeight = someMap.length;
  const y = randInt(1, mapHeight - maxIslandHeight - 1);
  const height = randInt(1, maxIslandHeight);
  const x = randInt(1, mapWidth - maxIslandWidth - 1);
  const width = randInt(2, maxIslandWidth);
  for (let iY = y - 1; iY < y + height + 1; iY++) {
    for (let iX = x - 1; iX < x + width + 1; iX++) {
      let curTile = someMap[iY][iX];
      someMap[iY][iX] = elevate(curTile);
    }
  }
  for (let iY = y; iY < y + height; iY++) {
    for (let iX = x; iX < x + width; iX++) {
      let curTile = someMap[iY][iX];
      someMap[iY][iX] = elevate(curTile);
    }
  }
};

const generateMap = (y, x) =>
  new Array(y).fill(blockLight).map(() => new Array(x).fill(blockLight));

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Map() {
  const [matrix, setMatrix] = useState(generateMap(25, 64));

  useInterval(() => {
    const newMatrix = cloneDeep(matrix);
    addIsland(newMatrix);
    setMatrix(newMatrix);
    // tick logic here
  }, 1000);

  const textMap = (
    <div style={{ lineHeight: "1.2" }}>
      {matrix.map((arr, i) => (
        <div key={i}>{arr.map(x => (x === blockMedium ? blockLight : x))}</div>
      ))}
    </div>
  );

  return <div>{textMap}</div>;
}
