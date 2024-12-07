const prepareData = (inputString: string) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);
  return lines.map(line => {
    const [result, termsString] = line.split(":").map(s => s.trim())
    return {
      result: Number(result),
      terms: termsString.split(" ").map(Number)
    }
  })
};

type Combination = Array<Array<string>>
const generateCombinations = (length: number) => {
  const results: string[][] = [];
  const totalCombinations = 1 << length; // 2^length

  for (let i = 0; i < totalCombinations; i++) {
    const combination: string[] = [];
    //go from 1010 to [+,*,+,*]
    for (let j = 0; j < length; j++) {
      // Check if the j-th bit is set (1) or not (0)
      combination.push((i & (1 << j)) !== 0 ? "+" : "*");
    }
    results.push(combination);
  }
  return results;
}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);
  // store the combination result so it doesn't have to be calculated again for the same length
  const operatorCombination: Record<number, Combination> = {}

  const results = data.map(({ result, terms }) => {
    const combinationLenghtNeeded = terms.length - 1
    const combinations = operatorCombination[combinationLenghtNeeded] || generateCombinations(combinationLenghtNeeded)
    operatorCombination[combinationLenghtNeeded] = combinations;

    const combinationsWithCorrectResult = combinations.some(combination => {
      const termsWithCombinationResult = terms.reduce((localResult, term, index) => {
        return combination[index - 1] === "+" ? localResult + term : localResult * term
      })

      return termsWithCombinationResult === result
    })

    return result * Number(combinationsWithCorrectResult)
  })

  return results.reduce((sum, curr) => sum + curr)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};