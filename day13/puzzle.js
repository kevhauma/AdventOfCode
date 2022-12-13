const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day13/test.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n\r?\n/g)
    .map((pairs) => pairs.split(/\r?\n/g).map((signal) => JSON.parse(signal)));
};

const compareArray = (firstArr, secondArr, index) => {
  //console.log("=========");
  //console.log(firstArr,"[vs]" ,secondArr);
  ++index
  if (index > 8) return null;
  for (const fI in firstArr) {
    let first = firstArr[fI];
    let second = secondArr[fI];
    if (!first) {
      break;
    };
    if (!second){
       index = -1
       break
      };
    //console.log("fs:",first, second);
    //check numbers if not arrays
    if (!Array.isArray(first) && !Array.isArray(second)) {
      if (first < second) {
         break
      } else if (first > second) {
        index = -1;
        break
      }
      else continue;
    }
    if (!Array.isArray(first)) first = [first];
    if (!Array.isArray(second)) second = [second];
    //console.log("newArrays:",first,second)
    index = compareArray(first, second, index);
  }
  return index
};

/*
Part one
*/
const p1 = () => {
  const data = prepareData();
  return data.reduce((sum, pair,index) => {
    //console.log("===***===***===")
    const rightOrder = compareArray(pair[0], pair[1], 0);
    //console.log(index + 1,sum, rightOrder, pair);
    if (rightOrder > 0) return sum + index+1;
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
