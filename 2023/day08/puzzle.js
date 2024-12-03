const prepareData = (inputString) => {
  const [instructions, dictionaryLines] = inputString
    .split(/\r?\n\r?\n/g)
    .filter(Boolean);

  const dictionary = dictionaryLines.split(/\r?\n/g).reduce((dict, line) => {
    const [legend, definition] = line.split(" = ");
    const [left, right] = definition.replace(/\(|\)/g, "").split(", ");
    dict[legend] = { left, right };
    return dict;
  }, {});

  return { instructions: instructions.split(""), dictionary };
};

const getNextStep = (currentStep, stepsAmount, instructions, dictionary) => {
  const { left, right } = dictionary[currentStep];

  const leftOrRight = instructions[stepsAmount % instructions.length];

  const nextStep = leftOrRight === "R" ? right : left;

  return nextStep;
};

/*
Part one
*/

export const p1 = (inputString) => {
  const { instructions, dictionary } = prepareData(inputString);
  let stepsAmount = 0;
  let currentStep = "AAA";
  do {
    const { left, right } = dictionary[currentStep];

    const leftOrRight = instructions[stepsAmount % instructions.length];

    const nextStep = leftOrRight === "R" ? right : left;

    currentStep = nextStep;

    stepsAmount += 1;
  } while (currentStep !== "ZZZ");
  return stepsAmount;
};

/*
Part two
*/
export const p2 = (inputString) => {
  const { instructions, dictionary } = prepareData(inputString);
  const allStepsEndingWithA = Object.keys(dictionary).filter((key) =>
    key.endsWith("A")
  );

  const stepsToZ = allStepsEndingWithA.map((start) => {
    let stepsAmount = 0;
    let currentStep = start;
    do {
      const { left, right } = dictionary[currentStep];

      const leftOrRight = instructions[stepsAmount % instructions.length];

      const nextStep = leftOrRight === "R" ? right : left;

      currentStep = nextStep;

      stepsAmount += 1;
    } while (!currentStep.endsWith("Z"));
    return stepsAmount;
  });

  return `${stepsToZ.join(
    " "
  )} https://www.calculatorsoup.com/calculators/math/lcm.php`;
};
