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



const getNextStep = (currentStep,stepsAmount,instructions,dictionary) => {
  const {left,right} = dictionary[currentStep]

  const leftOrRight = instructions[stepsAmount % instructions.length]
  
  const nextStep = leftOrRight === "R" ? right : left
  
  return nextStep
}

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  return 0
  const {instructions,dictionary} = prepareData(inputString, inputPath);
  let stepsAmount = 0;
  let currentStep = "AAA";
  do {
    const {left,right} = dictionary[currentStep]

    const leftOrRight = instructions[stepsAmount % instructions.length]
    
    const nextStep = leftOrRight === "R" ? right : left
    
    currentStep = nextStep
   
    stepsAmount += 1
  } while (currentStep !== "ZZZ");
  return stepsAmount;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const {instructions,dictionary} = prepareData(inputString, inputPath);
  const allStepsEndingWithA = Object.keys(dictionary).filter((key)=>key.endsWith("A"))
console.log(allStepsEndingWithA)
  let stepsAmount = 0;
  let currentSteps = allStepsEndingWithA
  do {
    
    currentSteps = currentSteps.map(step=> getNextStep(step,stepsAmount,instructions,dictionary))
   
    stepsAmount += 1
  } while (!currentSteps.every(step=>step.endsWith("Z")));
  return stepsAmount;
};


module.exports = { p1, p2 };
