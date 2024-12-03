const lookupDirections = {
  B: true,
  F: false,
  R: true,
  L: false,
};

function getAllIDs(entries) {
  let allIDs = [];
  entries.forEach((e) => {
    let sequence = e.split("");
    let rowSequence = sequence.splice(0, 7);
    let columnSequence = sequence;

    let rowNumber = binarySearch(rowSequence, 0, 127);
    let columnNumber = binarySearch(columnSequence, 0, 7);

    let ID = rowNumber * 8 + columnNumber;

    allIDs.push(ID);
  });
  return allIDs;
}

// PART ONE
// ============================================================================================
export const p1 = (inputString) => {
  let entries = inputString.split("\n").filter((e) => e !== "");

  let allIDs = getAllIDs(entries);

  return Math.max(...allIDs);
};

// PART TWO
// ============================================================================================
export const p2 = (inputString) => {
  let entries = inputString.split("\n").filter((e) => e !== "");

  let allIDs = getAllIDs(entries);

  let highestID = Math.max(...allIDs);
  for (let id = 0; id < highestID; id++) {
    let left = allIDs.find((i) => i == id + 1);
    let right = allIDs.find((i) => i == id - 1);
    let center = allIDs.find((i) => i == id);

    if (left != null && right != null && center == null) return id;
  }
};

function binarySearch(sequence, start, end) {
  if (sequence.length == 0) return start;
  let direction = sequence.shift();

  if (lookupDirections[direction]) {
    //upper half
    return binarySearch(sequence, Math.round((end - start) / 2 + start), end);
  } else {
    return binarySearch(sequence, start, Math.floor((end - start) / 2 + start));
  }
}
