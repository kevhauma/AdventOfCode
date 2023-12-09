// PART ONE
// ============================================================================================

const p1 = (inputString) => {
  let numbers = inputString.split("\n").map((n) => parseInt(n));

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
      if (numbers[i] + numbers[j] == 2020) {
        return `${numbers[i]} + ${numbers[j]} = ${numbers[j] + numbers[i]}
                ${numbers[i]} * ${numbers[j]} = ${numbers[j] * numbers[i]}`;
      }
    }
  }
};

// PART TWO
// ============================================================================================

const p2 = (inputString) => {
  let numbers = inputString.split("\n").map((n) => parseInt(n));

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
      for (let k = 0; k < numbers.length - 1; k++) {
        if (numbers[i] + numbers[j] + numbers[k] == 2020) {
          return `
          ${numbers[i]} + ${numbers[j]} + ${numbers[k]} = ${numbers[j] + numbers[i] + numbers[k]}
          ${numbers[i]} * ${numbers[j]}* ${numbers[k]} = ${numbers[j] * numbers[i] * numbers[k]}`
        }
      }
    }
  }
};
module.exports = { p1, p2 };
