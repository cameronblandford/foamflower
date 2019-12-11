export const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};
export const randInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
export const fillTemplate = (str, vars) => {
  let newStr = str;
  while (/\$.+/.test(newStr)) {
    let varName = newStr.match(/\$\w+/)[0];
    let newWord = pick(vars[varName] || ["REDACTED"]);
    newWord = /\$.+/.test(newWord) ? fillTemplate(newWord) : newWord;
    newStr = newStr.replace(varName, pick(vars[varName] || ["REDACTED"]));
  }
  return newStr;
};
