import React from "react";
import Hebrew from "./HebrewLetters";

const letterMap: { [key: string]: Hebrew | Hebrew[] } = {
  b: Hebrew.BET,
  c: Hebrew.KAF,
  d: Hebrew.DALET,
  f: Hebrew.FE,
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
    order: 9,
    gem: 9,
    word: "",
    symbolism: "",
  },
  [Hebrew.YOD]: {
    order: 10,
    gem: 10,
    word: "",
    symbolism: "",
  },
  [Hebrew.KAF]: {
    order: 11,
    gem: 20,
    word: "",
    symbolism: "",
  },
  [Hebrew.LAMED]: {
    order: 12,
    gem: 30,
    word: "",
    symbolism: "",
  },
  [Hebrew.MEM]: {
    order: 13,
    gem: 40,
    word: "",
    symbolism: "",
  },
  [Hebrew.NUN]: {
    order: 14,
    gem: 50,
    word: "",
    symbolism: "",
  },
  [Hebrew.SAMEKH]: {
    order: 15,
    gem: 60,
    word: "",
    symbolism: "",
  },
  [Hebrew.AYIN]: {
    order: 16,
    gem: 70,
    word: "",
    symbolism: "",
  },
  [Hebrew.PE]: {
    order: 17,
    gem: 80,
    word: "",
    symbolism: "",
  },
  [Hebrew.TSADI]: {
    order: 18,
    gem: 90,
    word: "",
    string: "Tsadi",
    symbolism: "",
  },
  [Hebrew.QOF]: {
    order: 19,
    gem: 100,
    word: "",
    string: "Qof",
    symbolism: "",
  },
  [Hebrew.RESH]: {
    order: 20,
    gem: 200,
    word: "",
    string: "Resh",
    symbolism: "",
  },
  [Hebrew.SIN]: {
    order: 21,
    gem: 300,
    word: "",
    string: "Sin",
    symbolism: "",
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
      <ul>{letters && letters.map(x => <li>{x.order}</li>)}</ul>
    </div>
  );
};

export default Kabbalah;
