function convertDataPartOne(data) {
  let entries = [];
  let lines = data.split("\n");
  let tempEntry = "";
  // go trough each line, add lines to entry until empty line,
  // empty line means new entry
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === "") {
      entries.push(tempEntry.trim());
      tempEntry = "";
    } else {
      tempEntry += line;
    }
  }
  return entries;
}
// PART ONE
// ============================================================================================
export const p1 = (inputString) => {
  let entries = convertDataPartOne(inputString);

  let answerSets = [];
  entries.forEach((e) => {
    let seperateAnswers = e.split("");
    let entrySet = new Set(seperateAnswers);
    answerSets.push(Array.from(entrySet));
  });

  let totalYes = answerSets.reduce((acum, curr) => acum + curr.length, 0);

  return totalYes;
};

// PART TWO
// ============================================================================================
function convertDataPartTwo(data) {
  let entries = [];
  let lines = data.split("\n");
  let tempEntry = "";
  // go trough each line, add lines to entry until empty line,
  // empty line means new entry
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === "") {
      entries.push(tempEntry.trim());
      tempEntry = "";
    } else {
      tempEntry += line + ";";
    }
  }
  return entries;
}

export const p2 = (inputString) => {
  let entries = convertDataPartTwo(inputString);

  let totalCount = 0;
  entries.forEach((e) => {
    answers = e.split(";").filter((a) => a !== "");

    entryAnswers = answers.map((a) => a.split(""));

    allAnswers = [];
    entryAnswers.forEach((ea) => {
      allAnswers.push(ea);
    });

    allAnswers = allAnswers.flat();

    let amountAnswered = {};

    allAnswers.forEach((a) => {
      if (!amountAnswered[a]) amountAnswered[a] = 1;
      else amountAnswered[a] = amountAnswered[a] + 1;
    });

    let countAllAnswered = 0;
    Object.keys(amountAnswered).forEach((key) => {
      if (amountAnswered[key] == entryAnswers.length) countAllAnswered++;
    });

    totalCount += countAllAnswered;
  });

  return totalCount;
};
