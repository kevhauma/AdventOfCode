const fs = require("fs");


const findNode = (nodes, x, y) => {
  return nodes.find((n) => x === n.x && y === n.y);
};
const vizualise = (nodes,height,width) => {
  for (let y = 0; y < height; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      const found =findNode(nodes,x,y);
      line += found ? found.letter : ".";
    }
    console.log(line);
  }
};

const prepareData = () => {
  return fs
    .readFileSync("./day12/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((x) => x.split(""));
};
const makeNode = (letter, x, y, distance = Infinity) => ({
  letter,
  x,
  y,
  visited: false,
  distance,
  tentDistance: 1,
});

const findNeighboursToGoTo = (nodes, currCell, width, heigth) => {
  const { x, y, letter } = currCell;
  const neighbours = [];
  if (x !== width) {
    const rightNeighbour = findNode(nodes, x + 1, y);
    if (rightNeighbour) {
      neighbours.push(rightNeighbour);
    }
  }
  if (x !== 0) {
    const leftNeighbour = findNode(nodes, x - 1, y);
    if (leftNeighbour ) {
      neighbours.push(leftNeighbour);
    }
  }
  if (y !== heigth) {
    const bottomNeighbour = findNode(nodes, x, y + 1);
    if (bottomNeighbour) {
      neighbours.push(bottomNeighbour);
    }
  }
  if (y !== 0) {
    const topNeighbour = findNode(nodes, x, y - 1);
    if (topNeighbour) {
      neighbours.push(topNeighbour);
    }
  }

  return neighbours.filter((n) => {
    //remove neighbours who's character is more than one up
    //if letter is E, check on letter z
    if (n.letter === "E") return "z".charCodeAt(0) - letter.charCodeAt(0) <= 1;
    else return n.letter.charCodeAt(0) - letter.charCodeAt(0) <= 1;
  });
};


// findDistance = (nodes, startNode, endNodes) {

// }

/*
Part one
*/
const p1 = () => {
  const data = prepareData();

  let startNode = { letter: "a", x: -1, y: -1 };
  let endNode = { letter: "E", x: -1, y: -1 };
  const allNodes = [];

  data.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === "S" || ) {
        startNode.push = makeNode("a", x, y, 0);
        allNodes.push(startNode)
      } else if (letter === "E") {
        endNode = makeNode("E", x, y);
        allNodes.push(endNode)
      } else allNodes.push(makeNode(letter, x, y));
    });
  });

  const width = Math.max(...allNodes.map((p) => p.x)) + 1
  const height = Math.max(...allNodes.map((p) => p.y)) + 1

  let nodesToVisit = [startNode];
let unvisitedNodes = [...allNodes]
  while (!findNode(nodesToVisit, endNode.x, endNode.y)) {
    const startPerf = performance.now()
    const nodesToVisitThisRound = [...nodesToVisit];
    nodesToVisit = [];
    nodesToVisitThisRound.forEach((currNode) => {
      const neighbours = findNeighboursToGoTo(
        unvisitedNodes,
        currNode,
        width,
        height
      );

      neighbours.forEach((neigh) => {
        neigh.visited = true;
        const newDistance = neigh.tentDistance + currNode.distance;
        if (newDistance < neigh.distance) {
          neigh.distance = newDistance;
        }
      });
      nodesToVisit.push(...neighbours);
      currNode.visited = true;
      currNode.distance += 1;
      unvisitedNodes = unvisitedNodes.filter((n) => !n.visited);
    });   
   
  }
  return endNode.distance
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();
};

module.exports = { p1, p2 };
p1();
