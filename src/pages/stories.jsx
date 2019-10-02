import React from "react"
import Layout from "../components/layout"

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
  console.log("please work")
  dates.push(randomDate(new Date(1800, 0, 0), new Date(1950, 0, 0)))
  console.log(dates)
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

const adjectives = [
  "strange",
  "brittle",
  "obsidian",
  "pained",
  "alert",
  "drowsy",
  "electrified",
  "galvanized",
  "gorgeous",
  "beautiful",
  "disconcerting",
]

const numberPassengers = Math.floor(Math.random() * 68) + 3

const nouns = [
  `a captor`,
  `a flock of strange birds`,
  `a fire`,
  `anger`,
  `morbid curiosity`,
  `wonderment`,
  `bewildered animals`,
  `tall clouds`,
  `a warm mist`,
  `hysteria`,
  `an uncertain rain`,
  `the captain`,
  `a stowaway`,
]

const verbs = ["assaults", "talks to", "attempts to calm", "feels", "aches for"]

const logs = sortedDates.map(date => {
  const dateString = date.toDateString()
  return `${dateString.toUpperCase()} :: ${pick(nouns)} ${pick(verbs)} ${pick(
    nouns
  )}`
})

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
]

const shipName = `${pick(shipPrefixes)} ${pick(shipAdjectives)} ${pick(
  shipNouns
)}`.toUpperCase()

const redactedSubstitute = "██"

const passengerCount = pick([redactedSubstitute, numberPassengers])

export default function stories() {
  return (
    <Layout>
      <div>
        <h1>{shipName}</h1>
        <h2>manifest</h2>
        <p>{passengerCount} passengers</p>
        <h2>travel log</h2>
        {logs.map(log => {
          return <p>{log}</p>
        })}
      </div>
    </Layout>
  )
}
