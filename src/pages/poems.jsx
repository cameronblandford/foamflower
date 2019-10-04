import React from "react"
import Layout from "../components/layout"
import { pick } from "../util/template"

const alphabet = "abcdefghijklmnopqrstuvwxyz    "

const randInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

const writeHaiku = () => {
  const firstLineLength = randInt(10, 20)
  const secondLineLength = randInt(15, 25)
  const thirdLineLength = randInt(10, 20)
  let firstLine = ""
  let secondLine = ""
  let thirdLine = ""
  for (let i = 0; i < firstLineLength; i++) {
    firstLine = firstLine + pick(alphabet)
  }
  for (let i = 0; i < secondLineLength; i++) {
    secondLine = secondLine + pick(alphabet)
  }
  for (let i = 0; i < thirdLineLength; i++) {
    thirdLine = thirdLine + pick(alphabet)
  }
  const poem = (
    <div>
      {firstLine}
      <br />
      {secondLine}
      <br />
      {thirdLine}
      <br />
    </div>
  )
  return poem
}
export default function poems() {
  return (
    <Layout>
      haikus
      <div className="poem">
        <h3>1</h3>
        {writeHaiku()}
        <h3>2</h3>
        {writeHaiku()}
        <h3>3</h3>
        {writeHaiku()}
        <h3>4</h3>
        {writeHaiku()}
        <h3>5</h3>
        {writeHaiku()}
      </div>
    </Layout>
  )
}
