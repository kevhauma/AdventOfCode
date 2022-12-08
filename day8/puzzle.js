const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day8/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((c) => c.split("").map((t) => parseInt(t)));
};

const isVisibleFromLeft = (data,x,y) => {
const height = data[y][x];
if(!y||!x ||y===data.length-1||x===data[y].length)
    return true

let index = 0;
let tallestTree = 0
while (index < x && tallestTree < height) {
  if (data[y][index] > tallestTree) tallestTree = data[y][index];
  ++index;
}
return (tallestTree < height)
};
const isVisibleFromRight = (data,x, y) => {
    const height = data[y][x];
    if (!y || !x || y === data.length - 1 || x === data[y].length) return true;

    let index = data[y].length-1;
    let tallestTree = 0;
    while (index > x && tallestTree < height) {
      if (data[y][index] > tallestTree) tallestTree = data[y][index];
      --index;
    }
    return tallestTree < height;
};
const isVisibleFromTop = (data, x, y) => {
    const height = data[y][x];
    if (!y || !x || y === data.length - 1 || x === data[y].length) return true;

    let index = 0;
    let tallestTree = 0;
    while (index < y && tallestTree < height) {
      if (data[index][x] > tallestTree) tallestTree = data[index][x];
      ++index
    }
    return tallestTree < height;
};
const isVisibleFromBottom = (data, x, y) => {
    
   const height = data[y][x];
   if (!y || !x || y === data.length - 1 || x === data[y].length-1) return true;

   let index = data.length-1;
   let tallestTree = 0;
   while (index > y && tallestTree < height) {
     if (data[index][x] > tallestTree) tallestTree = data[index][x];
     --index;
   }
   return tallestTree < height;

};

const treesVisibleOnLeft = (data, x, y) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length - 1)
    return 0;

   let index = x - 1;
   let amountOfTrees = 1;
   while (index > 0 && data[y][index] < height) {    
     --index;
     ++amountOfTrees;
     
   }
   return amountOfTrees;  
  
};
const treesVisibleOnRight = (data, x, y) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length - 1)
    return 0;

    let index = x + 1
    let amountOfTrees = 1
    while(index<data[0].length-1 && data[y][index] < height){
        ++index
        ++amountOfTrees
    }
    return amountOfTrees
 
};
const treesVisibleOnTop = (data, x, y) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length - 1)
    return 0;

   let index = y - 1;
   let amountOfTrees = 1;
   while (index > 0 && data[index][x] < height) {
     --index;
     ++amountOfTrees;
   }
   return amountOfTrees;  
};
const treesVisibleOnBottom = (data, x, y) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length - 1)
    return 0;

   let index = y + 1;
   let amountOfTrees = 1;
   while (index < data.length-1 && data[index][x] < height) {
     ++index;
     ++amountOfTrees;
   }
   return amountOfTrees;
};


/*
Part one
*/

const p1 = () => {
  const data = prepareData();
  
  return data.reduce((count,_, y, array) =>{
    const visibles= array[y].filter(
      (_,x) =>
        isVisibleFromBottom(array, x, y) ||
        isVisibleFromTop(array, x, y) ||
        isVisibleFromLeft(array, x, y) ||
        isVisibleFromRight(array, x, y) 
    )
    //console.log(visibles)
    return count + visibles.length
    },0
  );

};
/*
Part two
*/
const p2 = () => {
  const data = prepareData();
  let highestScore =0
  return data.reduce((max, _, y, array) => {
    const counts = array[y].map(
      (_, x) =>{
      const [a, b, c, d] = [
        treesVisibleOnTop(array, x, y),
        treesVisibleOnLeft(array, x, y),
        treesVisibleOnBottom(array, x, y),
        treesVisibleOnRight(array, x, y),
      ];
    
    const score = a*b*c*d
    if(x==4&&y==5)
    console.log(x, y, "-", a, b, c, d,"=",score);


    return score
    }
    );
    let maxInRow = Math.max(...counts)
    return maxInRow > max ? maxInRow : max;
  }, 0);
};

module.exports = { p1, p2 };
