import React from "react";
import Layout from "../../components/layout";

const data = [
  {
    name: "Feldspar",
    hp: 15,
    initiative: 5,
  },
  {
    name: "Axe goblin",
    hp: 10,
    initiative: 10,
  },
  {
    name: "Sword goblin",
    hp: 10,
    initiative: 3,
  },
];

const initSort = (a, b) => b.initiative - a.initiative;
data.sort(initSort);

const table = (
  <table>
    {data.map(c => {
      return (
        <tr>
          <td>{c.initiative}</td>
          <td>{c.name}</td>
          <td>HP: {c.hp}</td>
        </tr>
      );
    })}
  </table>
);

export default function other() {
  return <Layout>{table}</Layout>;
}
