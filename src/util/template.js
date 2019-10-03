import nouns, {
  trinkets,
  peoplePlural,
  peopleSingular,
  places,
  placeDescriptors,
} from "./nouns"
import adjectives from "./adjectives"
import verbs, {
  intransitiveVerbs,
  transitiveVerbs,
  linkingVerbs,
  noActionVerbs,
  auxiliaryVerbs,
} from "./verbs"
import adverbs from "./adverbs"

const vars = {
  $NOUN: nouns,
  $ADJ: adjectives,
  $VERB: verbs,
  $PLACE: places,
  $PLACEDESCRIPTOR: placeDescriptors,
  $PERSON: peopleSingular,
  $PEOPLE: peoplePlural,
  $TRINKET: trinkets,
  $ADVERB: adverbs,
  $INTRANSITIVEVERB: intransitiveVerbs,
  $TRANSITIVEVERB: transitiveVerbs,
  $LINKINGVERB: linkingVerbs,
  $NOACTIONVERB: noActionVerbs,
  $AUXILIARYVERB: auxiliaryVerbs,
}

const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const fillTemplate = str => {
  let newStr = str
  while (/\$.+/.test(newStr)) {
    let varName = newStr.match(/\$\w+/)[0]
    let newWord = pick(vars[varName] || ["REDACTED"])
    newWord = /\$.+/.test(newWord) ? fillTemplate(newWord) : newWord
    newStr = newStr.replace(varName, pick(vars[varName] || ["REDACTED"]))
  }
  return newStr
}

export default fillTemplate
