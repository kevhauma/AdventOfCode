const prepareData = (inputString) => {
  const strengths = [];
  let cycleNumber = 0;
  inputString
    .trim()
    .split(/\r?\n/g)
    .map((l) => ({
      instr: l.split(" ")[0],
      strength: parseInt(l.split(" ")[1]),
    }))
    .forEach((entry) => {
      let currentStrengthCycle = strengths[strengths.length - 1];
      let currentStrength = currentStrengthCycle ? currentStrengthCycle.end : 1;

      if (entry.instr === "addx") {
        strengths.push({
          start: currentStrength,
          cycleNumber: ++cycleNumber,
          end: currentStrength,
        });
        strengths.push({
          start: currentStrength,
          cycleNumber: ++cycleNumber,
          end: currentStrength + entry.strength,
        });
      } else
        strengths.push({
          start: currentStrength,
          cycleNumber: ++cycleNumber,
          end: currentStrength,
        });
    });
  return strengths.sort((a, b) => a.cycleNumber - b.cycleNumber);
};

/*
Part one
*/

export const p1 = (inputString) => {
  const strengths = prepareData(inputString);

  let indexToCheck = 20;

  return strengths
    .map((str) => {
      if (str.cycleNumber === indexToCheck) {
        const c = str.start * indexToCheck;
        indexToCheck += 40;
        return c;
      }
      return null;
    })
    .filter(Boolean)
    .reduce((sum, curr) => sum + curr);
};

/*F
Part two
*/
export const p2 = (inputString) => {
  const SCREEN_WIDTH = 40;
  const strengths = prepareData(inputString);
  let outputLines = ["\n"];
  let line = [];
  let spritePos = [0, 1, 2];
  strengths.forEach((str) => {
    const pixel = str.cycleNumber % SCREEN_WIDTH;

    //pixel drawn is one position behind on cyclenumber
    if (spritePos.includes(pixel - 1)) line.push("#");
    else line.push(".");
    if (!(str.cycleNumber % SCREEN_WIDTH)) {
      outputLines.push(line.join(""));
      line = [];
      spritePos = [0, 1, 2];
    }

    if (str.start !== str.end) spritePos = [str.end - 1, str.end, str.end + 1];
  });
  return outputLines.join("\n");
};
