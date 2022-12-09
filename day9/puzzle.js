const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day9/test.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map(l=>(l.split(" ")));
};


const moveHead = (start,dir) => {
  let newHead = null
switch (dir) {
  case "R":
    newHead = [start[0] + 1, start[1]];
    break;
  case "L":
    newHead = [start[0] - 1, start[1]];
    break;
  case "U":
    newHead = [start[0], start[1] + 1];
    break;
  case "D":
    newHead = [start[0], start[1] - 1];
    break;
}
return newHead
}

const moveTail = (previous,next) => {
  let tail = next
 const tailDiff = [next[0] - previous[0], next[1] - previous[1]];
 //right follow
 if (tailDiff[0] < -1) tail = [previous[0] - 1, previous[1]];
 //left follow
 if (tailDiff[0] > 1) tail = [previous[0] + 1, previous[1]];
 //up follow
 if (tailDiff[1] < -1) tail = [previous[0], previous[1] - 1];
 //down follow
 if (tailDiff[1] > 1) tail = [previous[0], previous[1] + 1];

 //right corner
 if (tailDiff[0] < -1 && tailDiff[1] !== 0) tail = [previous[0] - 1, previous[1]];
 //down corner
 if (tailDiff[0] > 1 && tailDiff[1] !== 0) tail = [previous[0] + 1, previous[1]];
 //up corner
 if (tailDiff[1] < -1 && tailDiff[0] !== 0) tail = [previous[0], previous[1] - 1];
 //down corner
 if (tailDiff[1] > 1 && tailDiff[0] !== 0) tail = [previous[0], previous[1] + 1];

 return tail
}

/*
Part one
*/
const p1 = () =>{
 const data = prepareData();
 const visited = ["0,0"]
let head = [0,0]
let tail = [0,0]
data.forEach(([dir,dis])=>{
Array.from(Array(parseInt(dis))).forEach((_,index)=>{
  let newHead =moveHead(head,dir);
  
  console.log(newHead)
  
  const newTail = moveTail(newHead,tail)

  visited.push(newTail.join(","));
  head = newHead;
  tail = newTail;
})
})
return new Set(visited).size
}

/*
Part two
*/

const p2 = () =>{
  const TAIL_SIZE = 9
 
const data = prepareData();
const visited = ["0,0"];
let head = [0, 0];
 let tails = Array.from(Array(TAIL_SIZE)).map((x) => [0, 0]);
data.forEach(([dir, dis]) => {
  Array.from(Array(parseInt(dis))).forEach((_,moveIndex) => {
    let newHead = moveHead(head,dir)
    console.log(newHead);

    let fullSnake = [newHead, ...tails];
    let tailIndex = 0;
    let prevTail = fullSnake[1];
    let newTails = [];
    while (prevTail) {
      ++tailIndex;
      let tail = fullSnake[tailIndex];
      if (!tail) return;
      const newTail = moveTail(prevTail,tail)
      // console.log(fullSnake[tailIndex], tail);
      visited.push(newTail.join(","));
      newTails.push(newTail);

      prevTail = newTail;
    }
    head = newHead;
    tails = [...newTails];
  });
});
 return new Set(visited).size;
}
module.exports = { p1, p2 };
