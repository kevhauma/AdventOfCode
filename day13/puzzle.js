const fs = require("fs");
const log = false;

const STATE = {
  CONTINUE:"C",
  CORRECT:"Y",
  INCORRECT:"N",
}

const prepareData = () => {
  return fs
    .readFileSync("./day13/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n\r?\n/g)
    .map((pairs) => pairs.split(/\r?\n/g).map((signal) => JSON.parse(signal)));
};

const compareArray = (firstArr, secondArr) => {
  log && console.log("=========");
log && console.log(firstArr, "[vs]", secondArr);
  let state = STATE.CONTINUE
  if(firstArr.length === 0) return STATE.CORRECT
  //if (index > 8) return null;
  for (const fI in (firstArr.length > secondArr.length ? firstArr:secondArr)) {
    let first = firstArr[fI];
    let second = secondArr[fI];
    log && console.log("fs:", first, "-", second);
    if (first === undefined) {
     return STATE.CORRECT
    };
    if (second ==undefined){
       return STATE.INCORRECT
      };
    //check numbers if not arrays
    if (!Array.isArray(first) && !Array.isArray(second)) {
      if (first < second) {
         return STATE.CORRECT
      } else if (first > second) {
       return STATE.INCORRECT
      }
      //if numbers are equal, dont make em into arrays
      else{ 
        state = STATE.CONTINUE;
        continue};
    }
    
    if (!Array.isArray(first)) first = [first];
    if (!Array.isArray(second)) second = [second];
    log && console.log("newArrays:", first, second);
    const deepState = compareArray(first, second);
    log && console.log("state:", deepState);
    state = deepState
    if(deepState !== STATE.CONTINUE)
      return deepState
  }
  return state
};

/*
Part one
*/
const p1 = () => {
  const data = prepareData();
  return data.reduce((sum, pair,index) => {
    log && console.log("===***===***===")
    const state = compareArray(pair[0], pair[1]);
    console.log(index + 1, state, sum);
    if (state !== STATE.INCORRECT) return sum + index+1;
    else return sum
  },0);
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();
};

module.exports = { p1, p2 };
