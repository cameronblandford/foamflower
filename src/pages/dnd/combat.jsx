import React, { useState } from "react";
import Layout from "../../components/layout";

const CombatPage = () => {
  const [newName, setNewName] = useState("");
  const [newInit, setNewInit] = useState(null);
  const [newHP, setNewHP] = useState(null);
  const [data, setData] = useState([]);
  const setHP = (name, hp) => {
    const newData = [...data];
    newData.find(x => name === x.name).hp = parseInt(hp, 10);
    console.log(newData);
    setData(newData);
  };
  const addCharacter = () => {
    const newData = [...data];
    newData.push({
      name: newName,
      hp: newHP,
      initiative: newInit,
    });
    newData.sort((a, b) => b.initiative - a.initiative);
    setData(newData);
    setNewHP(undefined);
    setNewName("");
    setNewInit(undefined);
  };
  const removeCharacter = name => {
    const newData = [...data].filter(x => x.name !== name);
    setData(newData);
  };
  const table = (
    <table>
      <tr>
        <th>name</th>
        <th>initiative</th>
        <th>hp</th>
      </tr>
      {data.map(c => {
        return (
          <tr>
            <td>{c.name}</td>
            <td>{c.initiative}</td>
            <td>
              HP:{" "}
              <input
                type="number"
                value={c.hp}
                onChange={e => setHP(c.name, e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => removeCharacter(c.name)}>Remove</button>
            </td>
          </tr>
        );
      })}
      <tr>
        <td>
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </td>
        <input
          type="number"
          value={newInit}
          onChange={e => setNewInit(e.target.value)}
        />
        <td>
          <input
            type="number"
            value={newHP}
            onChange={e => setNewHP(e.target.value)}
          />
        </td>
        <td>
          <button onClick={addCharacter}>Add</button>
        </td>
      </tr>
    </table>
  );
  return <Layout>{table}</Layout>;
};

export default CombatPage;
