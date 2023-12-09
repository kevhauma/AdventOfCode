const fs = require("fs");
// PART ONE
// ============================================================================================

function convertData(data) {
  return data.split("\n").map((e) => {
    let [rule, password] = e.split(":").map((e) => e.trim());
    return {
      rule: ruleToObject(rule),
      password,
    };
  });
}

function ruleToObject(rule) {
  let [min, max, letter] = rule.replace("-", " ").split(" ");
  return {
    string: rule,
    min: parseInt(min),
    max: parseInt(max),
    letter,
  };
}

const p1 = (inputString) => {
  let entries = convertData(inputString);

  let results = 0;

  entries.forEach((e) => {
    let lettercount = e.password
      .split("")
      .reduce(
        (count, letter) => (letter == e.rule.letter ? ++count : count),
        0
      );

    if (lettercount >= e.rule.min && lettercount <= e.rule.max) results++;
  });

  return results;
};

// PART TWO
// ============================================================================================

const p2 = (inputString) => {
  let entries = convertData(inputString);

  let results = 0;

  entries.forEach((e) => {
    let matches = false;
    if (e.password.charAt(e.rule.min - 1) == e.rule.letter) matches = !matches;
    if (e.password.charAt(e.rule.max - 1) == e.rule.letter) {
      matches = !matches;
    }
    if (matches) results++;
  });

  return results;
};

module.exports = { p1, p2 };
