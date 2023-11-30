const fs = require("fs");
const log = false;

const STATE = {
  CONTINUE: "C",
  CORRECT: "Y",
  INCORRECT: "N",
};

const prepareData = (inputString,inputPath) => {
  return inputString
    .trim()
    .split(/\r?\n\r?\n/g)
    .map((pairs) => pairs.split(/\r?\n/g).map((signal) => JSON.parse(signal)));
};

const compareArray = (firstArr, secondArr) => {
  log && console.log("=========");
  log && console.log(firstArr, "[vs]", secondArr);
  let state = STATE.CONTINUE;
  if (firstArr.length === 0 && secondArr.length !== 0) return STATE.CORRECT;
  //if (index > 8) return null;
  for (const fI in firstArr.length > secondArr.length ? firstArr : secondArr) {
    let first = firstArr[fI];
    let second = secondArr[fI];

    log && console.log("fs:", first, "-", second);
    if (second !== undefined && first === undefined) {
      return STATE.CORRECT;
    }
    if (first !== undefined && second === undefined) {
      return STATE.INCORRECT;
    }
    //check numbers if not arrays
    if (!Array.isArray(first) && !Array.isArray(second)) {
      if (first < second) {
        return STATE.CORRECT;
      } else if (first > second) {
        return STATE.INCORRECT;
      }
      //if numbers are equal, dont make em into arrays
      else {
        state = STATE.CONTINUE;
        continue;
      }
    }

    if (!Array.isArray(first)) first = [first];
    if (!Array.isArray(second)) second = [second];
    log && console.log("newArrays:", first, second);
    const deepState = compareArray(first, second);
    log && console.log("state:", deepState);
    state = deepState;
    if (deepState !== STATE.CONTINUE) return deepState;
  }
  return state;
};

/*
Part one
*/
const p1 = (inputString,inputPath) => {
  const data = prepareData(inputString,inputPath);
  return data.reduce((sum, pair, index) => {
    log && console.log("===***===***===");
    const state = compareArray(pair[0], pair[1], true);
    log && console.log(index + 1, state, sum);
    if (state !== STATE.INCORRECT) return sum + index + 1;
    else return sum;
  }, 0);
};

const findFirstInt = (array) => {
  for (const item of array) {
    if (!Array.isArray(item)) return item;
    else return findFirstInt(item);
  }
};

/*
Part two
*/
const p2 = (inputString,inputPath) => {
  const data = prepareData(inputString,inputPath);
  let ordered = { 2: [[[2]]], 6: [[[6]]] };
  data.flat().forEach((packet) => {
    let int = findFirstInt(packet);
    if (int === undefined) int = "-1";
    if (!ordered[`${int}`]) ordered[`${int}`] = [packet];
    else ordered[`${int}`].push([packet]);
  });

  let twoDivider = 1;
  let sixDivider = 1;

  Object.keys(ordered)
    .sort()
    .forEach((or) => {
      if (parseInt(or) < 2) twoDivider += ordered[or].length;
      if (parseInt(or) < 6) sixDivider += ordered[or].length;
    });
  return twoDivider * sixDivider;
};

module.exports = { p1, p2 };
