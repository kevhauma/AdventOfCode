const prepareData = (inputString) => {
  return inputString
    .trim()
    .split(/\r?\n/g)
    .map((l) => l.split(" "));
};

const moveHead = (start, dir) => {
  let newHead = null;
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
  return newHead;
};

const moveTail = (previous, next, isHead) => {
  let tail = next;
  const tailDiff = [next[0] - previous[0], next[1] - previous[1]];

  //up follow
  if (tailDiff[1] < -1) tail = [previous[0], previous[1] - 1];
  //down follow
  if (tailDiff[1] > 1) tail = [previous[0], previous[1] + 1];
  //right follow
  if (tailDiff[0] < -1) tail = [previous[0] - 1, previous[1]];
  //left follow
  if (tailDiff[0] > 1) tail = [previous[0] + 1, previous[1]];

  //up corner
  if (tailDiff[1] < -1 && tailDiff[0] < -1) {
    tail = [previous[0] - 1, previous[1] - 1];
  }
  if (tailDiff[1] < -1 && tailDiff[0] > 1) {
    tail = [previous[0] + 1, previous[1] - 1];
  }
  //down corner
  if (tailDiff[1] > 1 && tailDiff[0] < -1) {
    tail = [previous[0] - 1, previous[1] + 1];
  }
  if (tailDiff[1] > 1 && tailDiff[0] > 1) {
    tail = [previous[0] + 1, previous[1] + 1];
  }
  //right corner
  if (tailDiff[0] < -1 && tailDiff[1] < -1) {
    tail = [previous[0] - 1, previous[1] - 1];
  }
  if (tailDiff[0] < -1 && tailDiff[1] > 1) {
    tail = [previous[0] - 1, previous[1] + 1];
  }
  //left corner
  if (tailDiff[0] > 1 && tailDiff[1] < -1) {
    tail = [previous[0] + 1, previous[1] - 1];
  }
  if (tailDiff[0] > 1 && tailDiff[1] > 1) {
    tail = [previous[0] + 1, previous[1] + 1];
  }
  return tail;
};

const visualize = (visited, max, min) => {
  console.log("______________________________");
  const uniques = Array.from(new Set(visited)).map((x) => x.split(","));
  for (let y = max[1]; y >= min[1]; y--) {
    let row = "";
    for (let x = min[0]; x <= max[0]; x++) {
      const found = uniques.find((uq) => uq[0] == x && uq[1] == y);
      row += found ? "# " : ". ";
    }
    console.log(row);
  }
};

/*
Part one
*/
export const p1 = (inputString) => {
  // const data = prepareData(inputString,inputPath);
  // const visited = ["0,0"];
  // let head = [0, 0];
  // let tail = [0, 0];
  // let max = [0, 0];
  // let min = [0, 0];
  // data.forEach(([dir, dis]) => {
  //   Array.from(Array(parseInt(dis))).forEach((_, i) => {
  //     let newHead = moveHead(head, dir);
  //     const newTail = moveTail(newHead, tail, !i);
  //     visited.push(newTail.join(","));
  //     if (newTail[0] > max[0]) max[0] = newTail[0];
  //     if (newTail[1] > max[1]) max[1] = newTail[1];
  //     if (newTail[0] < min[0]) min[0] = newTail[0];
  //     if (newTail[1] < min[1]) min[1] = newTail[1];
  //     head = newHead;
  //     tail = newTail;
  //   });
  // });
  // visualize(visited, max,min);
  // return new Set(visited).size;
};

/*
Part two
*/

export const p2 = (inputString) => {
  const TAIL_SIZE = 9;

  const data = prepareData(inputString); //.slice(0,2);
  const visited = ["0,0"];
  let head = [0, 0];
  let tails = Array.from(Array(TAIL_SIZE)).map((x) => [0, 0]);

  let max = [0, 0];
  let min = [0, 0];
  data.forEach(([dir, dis]) => {
    Array.from(Array(parseInt(dis))).forEach((_) => {
      let newHead = moveHead(head, dir);

      let previousTail = newHead;
      const newTails = tails.map((tail, i) => {
        const newTail = moveTail(previousTail, tail);
        if (i + 1 === TAIL_SIZE) visited.push(newTail.join(","));
        if (newTail[0] > max[0]) max[0] = newTail[0];
        if (newTail[1] > max[1]) max[1] = newTail[1];
        if (newTail[0] < min[0]) min[0] = newTail[0];
        if (newTail[1] < min[1]) min[1] = newTail[1];
        previousTail = newTail;

        return newTail;
      });

      head = newHead;
      tails = [...newTails];
      // visualize([head.join(","), ...tails.map((x) => x.join(","))], max, min);
    });
  });

  //visualize(visited, max,min);
  return new Set(visited).size;
};
