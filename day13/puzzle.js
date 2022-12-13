const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day13/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n\r?\n/g)
    .map((pairs) => pairs.split(/\r?\n/g).map((signal) => JSON.parse(signal)));
};

const compareArray = (firstArr, secondArr, index) => {
  console.log("=========");
  console.log("index:",index)  
  console.log(firstArr, "[vs]", secondArr);
  if (index === -1) return -1;
  if(firstArr.length === 0) return ++index
  ++index;
  //if (index > 8) return null;
  for (const fI in firstArr) {
    let first = firstArr[fI];
    let second = secondArr[fI];
    console.log("fs:", first,"-", second);
    if (!first) {
     return ++index
    };
    if (!second){
       return -1
      };
    //check numbers if not arrays
    if (!Array.isArray(first) && !Array.isArray(second)) {
      if (first < second) {
         return ++index;
      } else if (first > second) {
       return -1
      }
      //if numbers are equal, dont make em into arrays
      else continue;
    }
    if (!Array.isArray(first)) first = [first];
    if (!Array.isArray(second)) second = [second];
   console.log("newArrays:",first,second)
    index = compareArray(first, second, index);
    if(index === -1) return -1
  }
  return index
};

/*
Part one
*/
const p1 = () => {
  const data = prepareData();
  return data.reduce((sum, pair,index) => {
    console.log("===***===***===")
    const rightOrder = compareArray(pair[0], pair[1], 1);
    console.log(index + 1,rightOrder > 0?"y":"n",sum);
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
