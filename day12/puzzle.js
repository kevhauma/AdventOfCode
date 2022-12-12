const fs = require("fs");

const findNode = (nodes, x, y) => {
  return nodes.find((n) => x === n.x && y === n.y);
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
    if (leftNeighbour) {
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
    return letter.charCodeAt(0) - n.letter.charCodeAt(0) <= 1;
  });
};

const findDistance = (nodes, start, end, part1) => {
  const allNodes = JSON.parse(JSON.stringify(nodes)).map(
    ({ distance, ...node }) => ({
      ...node,
      distance: distance === null ? Infinity : distance,
    })
  );
  const startNode = findNode(allNodes, start.x, start.y);
  const endNode = findNode(allNodes, end.x, end.y);

  const width = Math.max(...allNodes.map((p) => p.x)) + 1;
  const height = Math.max(...allNodes.map((p) => p.y)) + 1;

  let nodesToVisit = [startNode];
  let unvisitedNodes = [...allNodes];

  while (
    part1
      ? !endNode.visited
      : !nodesToVisit.map((n) => n.letter).includes(end.letter)
  ) {
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

  const closestEndNode = part1
    ? endNode
    : nodesToVisit
        .filter((n) => n.letter === end.letter)
        .sort((a, b) => a.distance - b.distance)[0];
  return closestEndNode.distance;
};

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
      if (letter === "S") {
        startNode = makeNode("a", x, y);
        allNodes.push(startNode);
      } else if (letter === "E") {
        endNode = makeNode("{", x, y, 0);
        allNodes.push(endNode);
      } else allNodes.push(makeNode(letter, x, y));
    });
  });

  return findDistance(allNodes, endNode, startNode, true);
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();

  let endNode = { letter: "E", x: -1, y: -1 };
  const allNodes = [];

  data.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === "E") {
        endNode = makeNode("{", x, y, 0);
        allNodes.push(endNode);
      } else allNodes.push(makeNode(letter === "S" ? "a" : letter, x, y));
    });
  });

  const distance = findDistance(allNodes, endNode, { letter: "a" });

  return distance;
};

module.exports = { p1, p2 };
p1();
