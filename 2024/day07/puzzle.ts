type DataType = Array<{
  result: number,
  terms: Array<number>
}>
type OperatorFunction = (t1: number, t2: number) => number
type OperatorConfigType = Record<string, OperatorFunction | null>

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
const generateCombinations = (length: number, symbols: Array<string>) => {
  const results: string[][] = [];
  const totalCombinations = Math.pow(symbols.length, length)
  
  for (let i = 0; i < totalCombinations; i++) {
    //go from 5 to 0101 to [*,+,*,+]
    const combination = i
      .toString(symbols.length)
      .padStart(length, "0")
      .split("")
      .map(binString => symbols[Number(binString)]);

    results.push(combination);
  }
  return results;
}

const findResultsWithCorrectCombinations = (data: DataType, operators: OperatorConfigType) => {
  // store the combination result so it doesn't have to be calculated again for the same length
  const operatorCombination: Record<number, Combination> = {}

  return data.filter(({ result, terms }) => {
    const combinationLenghtNeeded = terms.length - 1
    const combinations = operatorCombination[combinationLenghtNeeded] 
    || generateCombinations(combinationLenghtNeeded, Object.keys(operators))
    
    operatorCombination[combinationLenghtNeeded] = combinations;
    
    return combinations.some(combination => {
      const termsWithCombinationResult = terms.reduce((localResult, term, index) => {
        //use function from the operators config
        return operators[combination[index - 1]]?.(localResult,term) || localResult
      })
      
      return termsWithCombinationResult === result
    })
  })
}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);

  const operators = {
    "*": (term1: number, term2: number) => term1 * term2,
    "+": (term1: number, term2: number) => term1 + term2
  }
  const results = findResultsWithCorrectCombinations(data, operators)
  return results.reduce((sum, curr) => sum + curr.result, 0)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);

  const operators = {
    "*": (term1: number, term2: number) => term1 * term2,
    "+": (term1: number, term2: number) => term1 + term2,
    "||": (term1: number, term2: number) => Number(`${term1}${term2}`),
  }
  const results = findResultsWithCorrectCombinations(data, operators)
  return results.reduce((sum, curr) => sum + curr.result, 0)
};