import React from 'react'
import PropTypes from 'prop-types'

const letterMap = {
  b: 'bet',
  c: 'kuf',
  d: 'dalet',
  f: 'fe',
  g: 'gimel',
  h: 'he',
  j: 'zayin',
  k: 'kuf',
  l: 'lamed',
  m: 'mem',
  n: 'nun',
  p: 'pe',
  q: 'kuf-vav',
  r: 'reish',
  s: 'sin',
  t: 'tav',
  v: 'vav',
  w: 'vav',
  x: 'kuf-samekh',
  y: 'yud',
  z: 'zayin',
}

const meaningMap = {
  'aleph': {
    order: 1,
    gem: 1,
    word: '',
    symbolism: ''
  },
  'bet': {
    order: 2,
    gem: 2,
    word: '',
    symbolism: ''
  },
  'gimel': {
    order: 3,
    gem: 3,
    word: '',
    symbolism: ''
  },
  'dalet': {
    order: 4,
    gem: 4,
    word: '',
    symbolism: ''
  },
  'he': {
    order: 5,
    gem: 5,
    word: '',
    symbolism: ''
  },
  'vav': {
    order: 6,
    gem: 6,
    word: '',
    symbolism: ''
  },
  'zayin': {
    order: 7,
    gem: 7,
    word: '',
    symbolism: ''
  },
  'heh': {
    order: 8,
    gem: 8,
    word: '',
    symbolism: ''
  },
  'tet': {
    order: 9,
    gem: 9,
    word: '',
    symbolism: ''
  },
  'yud': {
    order: 10,
    gem: 10,
    word: '',
    symbolism: ''
  },
  'khaf': {
    order: 11,
    gem: 20,
    word: '',
    symbolism: ''
  },
  'lamed': {
    order: 12,
    gem: 30,
    word: '',
    symbolism: ''
  },
  'mem': {
    order: 13,
    gem: 40,
    word: '',
    symbolism: ''
  },
  'nun': {
    order: 14,
    gem: 50,
    word: '',
    symbolism: ''
  },
  'samekh': {
    order: 15,
    gem: 60,
    word: '',
    symbolism: ''
  },
  'ayin': {
    order: 16,
    gem: 70,
    word: '',
    symbolism: ''
  },
  'pe': {
    order: 17,
    gem: 80,
    word: '',
    symbolism: ''
  },
  'tsadde': {
    order: 18,
    gem: 90,
    word: '',
    symbolism: ''
  },
  'kuf': {
    order: 19,
    gem: 100,
    word: '',
    symbolism: ''
  },
  'reish': {
    order: 20,
    gem: 200,
    word: '',
    symbolism: ''
  },
  'sin': {
    order: 21,
    gem: 300,
    word: '',
    symbolism: ''
  },
  'tav': {
    order: 22,
    gem: 400,
    word: '',
    symbolism: ''
  },
}

const removeVowels = (word) => {
  let noVowels = word
    .split("")
    .filter(x => !["a", "e", "i", "o", "u"].includes(x))
    .join("");
  return noVowels;
}

const mapIt = (word) => {
  const noVowels = removeVowels(word);
  console.log(word);
  console.log(noVowels);
  return noVowels.split("").map(l=>meaningMap[letterMap[l]])
}

const kabbalh = props => {
  const { word } = props;
  const letters = mapIt(word);
  console.log(letters)
  return (
    <div>
      <p>{word}</p>
      <p>gemmatria vlaue</p>
      <ul>
        {letters && letters.map(x => (<li>{x.order}</li>))}
      </ul>
    </div>
  )
}

export default kabbalh
