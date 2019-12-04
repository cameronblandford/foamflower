import React from "react";
import Hebrew from "./HebrewLetters";

const letterMap: { [key: string]: Hebrew | Hebrew[] } = {
  b: Hebrew.BET,
  c: Hebrew.KAF,
  d: Hebrew.DALET,
  f: Hebrew.VAV,
  g: Hebrew.GIMEL,
  h: Hebrew.HE,
  j: Hebrew.ZAYIN,
  k: Hebrew.KAF,
  l: Hebrew.LAMED,
  m: Hebrew.MEM,
  n: Hebrew.NUN,
  p: Hebrew.PE,
  q: [Hebrew.KAF, Hebrew.VAV],
  r: Hebrew.RESH,
  s: Hebrew.SIN,
  t: Hebrew.TAV,
  v: Hebrew.VAV,
  w: Hebrew.VAV,
  x: [Hebrew.KAF, Hebrew.SAMEKH],
  y: Hebrew.YOD,
  z: Hebrew.ZAYIN,
};

interface ILetterMeaning {
  order: number;
  gem: number;
  word: string;
  symbolism: string;
  string?: string;
  letter?: string;
}

const meaningMap: { [key: number]: ILetterMeaning } = {
  [Hebrew.ALEPH]: {
    gem: 1,
    letter: "א",
    order: 1,
    string: "Aleph",
    symbolism:
      "Visually two yods connected by a vav, representing the higher and lower world, separated and connected by a hose, tube, or (Jacob's) ladder.",
    word: "Unity, The Creator",
  },
  [Hebrew.BET]: {
    gem: 2,
    letter: "ב",
    order: 2,
    string: "Bet",
    symbolism:
      "The first letter of the Torah. Represents the beginning of duality (a giver and a receiver). The source and beginning and container of all other letters.",
    word: "Vessel, Container, House",
  },
  [Hebrew.GIMEL]: {
    gem: 3,
    letter: "ג",
    order: 3,
    string: "Gimel",
    symbolism: "",
    word: "Camel, Travel, Change, Motion, Resolution",
  },
  [Hebrew.DALET]: {
    gem: 4,
    order: 4,
    symbolism: "",
    word: "",
  },
  [Hebrew.HE]: {
    gem: 5,
    order: 5,
    symbolism: "",
    word: "",
  },
  [Hebrew.VAV]: {
    gem: 6,
    order: 6,
    symbolism: "",
    word: "",
  },
  [Hebrew.ZAYIN]: {
    gem: 7,
    order: 7,
    symbolism: "",
    word: "",
  },
  [Hebrew.CHET]: {
    gem: 8,
    order: 8,
    symbolism: "",
    word: "",
  },
  [Hebrew.TET]: {
    gem: 9,
    order: 9,
    symbolism: "",
    word: "",
  },
  [Hebrew.YOD]: {
    gem: 10,
    order: 10,
    symbolism: "",
    word: "",
  },
  [Hebrew.KAF]: {
    gem: 20,
    order: 11,
    symbolism: "",
    word: "",
  },
  [Hebrew.LAMED]: {
    gem: 30,
    order: 12,
    symbolism: "",
    word: "",
  },
  [Hebrew.MEM]: {
    gem: 40,
    order: 13,
    symbolism: "",
    word: "",
  },
  [Hebrew.NUN]: {
    gem: 50,
    order: 14,
    symbolism: "",
    word: "",
  },
  [Hebrew.SAMEKH]: {
    gem: 60,
    order: 15,
    symbolism: "",
    word: "",
  },
  [Hebrew.AYIN]: {
    gem: 70,
    order: 16,
    symbolism: "",
    word: "",
  },
  [Hebrew.PE]: {
    gem: 80,
    order: 17,
    symbolism: "",
    word: "",
  },
  [Hebrew.TSADI]: {
    gem: 90,
    order: 18,
    string: "Tsadi",
    symbolism: "",
    word: "",
  },
  [Hebrew.QOF]: {
    gem: 100,
    order: 19,
    string: "Qof",
    symbolism: "",
    word: "",
  },
  [Hebrew.RESH]: {
    gem: 200,
    order: 20,
    string: "Resh",
    symbolism: "",
    word: "",
  },
  [Hebrew.SIN]: {
    gem: 300,
    order: 21,
    string: "Sin",
    symbolism: "",
    word: "",
  },
  [Hebrew.TAV]: {
    gem: 400,
    order: 22,
    string: "Tav",
    symbolism: "",
    word: "",
  },
};

const removeVowels = (word: string): string => {
  const noVowels = word
    .split("")
    .filter(x => !["a", "e", "i", "o", "u", " ", "-"].includes(x))
    .join("");
  return noVowels;
};

const mapIt = (word: string): ILetterMeaning[] => {
  const noVowels = removeVowels(word);
  return noVowels.split("").flatMap((l: string) => {
    const mappedLetter = letterMap[l];
    if (Array.isArray(mappedLetter)) {
      return mappedLetter.map((x: Hebrew) => meaningMap[x]);
    }
    return meaningMap[mappedLetter];
  });
};

interface IKabbalahProps {
  word: string;
}
const Kabbalah: React.FC<IKabbalahProps> = props => {
  const { word } = props;
  const letters = mapIt(word);
  let sum = 0;
  for (const letter of letters) {
    sum += letter.gem;
  }
  return (
    <div>
      <p>{word}</p>
      <p>gemmatria value: {sum}</p>
      <ul>{letters && letters.map(x => <li>letter: {x.gem}</li>)}</ul>
    </div>
  );
};

export default Kabbalah;
