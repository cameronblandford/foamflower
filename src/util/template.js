import nouns, {
  trinkets,
  peoplePlural,
  peopleSingular,
  harbors,
  harborDescriptors,
  illnesses,
  songs,
  colors,
  landmarksThrough,
  landmarksNearby,
  environments,
  travel,
} from "./nouns"
import adjectives from "./adjectives"
import verbs, {
  intransitiveVerbs,
  linkingVerbs,
  noActionVerbs,
  auxiliaryVerbs,
  transitiveVerbsSingle,
  transitiveVerbsPlural,
} from "./verbs"
import adverbs from "./adverbs"

const vars = {
  $NOUN: nouns,
  $ADJECTIVE: adjectives,
  $VERB: verbs,
  $HARBOR: harbors,
  $HARBORDESCRIPTOR: harborDescriptors,
  $PERSON: peopleSingular,
  $PEOPLE: peoplePlural,
  $TRINKET: trinkets,
  $ADVERB: adverbs,
  $INTRANSITIVEVERB: intransitiveVerbs,
  $TRANSITIVEVERBSINGLE: transitiveVerbsSingle,
  $TRANSITIVEVERBPLURAL: transitiveVerbsPlural,
  $LINKINGVERB: linkingVerbs,
  $NOACTIONVERB: noActionVerbs,
  $AUXILIARYVERB: auxiliaryVerbs,
  $ILLNESS: illnesses,
  $SONG: songs,
  $COLOR: colors,
  $TRAVELWORD: travel,
  $ENVIRONMENT: environments,
  $LANDMARKTHROUGH: landmarksThrough,
  $LANDMARKNEARBY: landmarksNearby,
}

export const pick = arr => {
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
