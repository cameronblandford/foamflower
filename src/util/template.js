import nouns from "./nouns"
import adjectives from "./adjectives"
import verbs from "./verbs"

const vars = {
  $NOUN: nouns,
  $ADJ: adjectives,
  $VERB: verbs,
}

const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const fillTemplate = str => {
  let newStr = str
  while (/\$.+/.test(newStr)) {
    let varName = newStr.match(/\$\w+/)[0]
    console.log(varName)
    newStr = newStr.replace(varName, pick(vars[varName] || ["REDACTED"]))
  }
  return newStr
}

export default fillTemplate
