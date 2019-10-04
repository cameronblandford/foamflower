import React from "react"
import Layout from "../components/layout"
import fillTemplate from "../util/template"
import templates from "../util/templates"
import Map from "../components/pieces/map"
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const dates = []

// fill dates
const logSize = Math.floor(Math.random() * 10) + 5

for (let i = 0; i < logSize; i += 1) {
  dates.push(randomDate(new Date(1800, 0, 0), new Date(1950, 0, 0)))
}

const date_sort_asc = (date1, date2) => {
  // This is a comparison function that will result in dates being sorted in
  // ASCENDING order. As you can see, JavaScript's native comparison operators
  // can be used to compare dates. This was news to me.
  if (date1 > date2) return 1
  if (date1 < date2) return -1
  return 0
}

const sortedDates = dates.sort(date_sort_asc)

const numberPassengers = Math.floor(Math.random() * 300) + 3

const shipPrefixes = [
  "H.M.S.",
  "S.S.",
  "M.V.",
  "P.S.",
  "R.M.S.",
  "R.V.",
  "H.M.N.Z.S.",
  "H.M.C.S.",
  "U.S.F.",
  "U.S.S.",
  "E.R.R.V.",
  "F.P.S.O.",
  "G.T.S.",
  "L.N.C.",
  "Y.M.T.",
  "D.V.",
  "H.S.",
]

const shipAdjectives = [
  "morning",
  "breaking",
  "tired",
  "anxious",
  "yellow",
  "fighting",
  "marrowed",
  "hollow",
  "faceted",
  "crystalled",
  "aching",
  "resilient",
  "proud",
  "new",
  "old",
]

const shipNouns = [
  "glory",
  "bonhomme",
  "boxer",
  "dew",
  "father",
  "fairy",
  "traveller",
  "trickster",
  "child",
  "goliath",
  "painter",
  "alexander",
  "lover",
  "knight",
  "oyster",
  "funeral",
  "dinner",
  "excellence",
  "opal",
  "fortune",
  "simone",
  "endurance",
  "solution",
  "eminence",
  "versailles",
  "orca",
  "dream",
]

const shipName = `${pick(shipPrefixes)} ${pick(shipAdjectives)} ${pick(
  shipNouns
)}`.toUpperCase()

const apply = (func, val, chance = 0.5) => {
  const flip = Math.random()
  if (flip <= chance) {
    return func(val)
  }
  return val
}

const redactWord = word => {
  return "█".repeat(word.length)
}

const redact = str => {
  const strArr = str.split(" ")
  const redactIndex = Math.floor(Math.random() * strArr.length)
  const redactedWord = strArr[redactIndex]
  strArr[redactIndex] = redactWord(redactedWord)
  return strArr.join(" ")
}

export default function stories() {
  const logs = sortedDates.map(date => {
    const dateString = date.toDateString()
    return `${dateString.toUpperCase()} :: ${fillTemplate(pick(templates))}`
  })
  return (
    <Layout>
      <div>
        <h1>{shipName}</h1>
        <h2>manifest</h2>
        <p>{apply(redactWord, `${numberPassengers}`, 0.1)} passengers</p>
        <h2>travel log</h2>
        {logs.map(log => {
          return <p key={log}>{apply(redact, log, 0.01)}</p>
        })}
        <hr />
        <Map />
      </div>
    </Layout>
  )
}
