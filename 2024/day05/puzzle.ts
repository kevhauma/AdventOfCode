type RuleDictType = Record<number, Array<number>>;
const prepareData = (inputString: string) => {
  const [orderRulesString, pagesToProduceString] = inputString.trim().split(/\r?\n\r?\n/g).filter(Boolean);

  const rulesList = orderRulesString.trim().split(/\r?\n/g).map(rule => {
    const [pageX, pageY] = rule.split("|").map(Number);
    return { pageX, pageY }
  })
  const rulesDict = rulesList.reduce((dict, rule) => {
    if (dict[rule.pageX])
      dict[rule.pageX].push(rule.pageY)
    else
      dict[rule.pageX] = [rule.pageY]
    return dict
  }, {} as RuleDictType)

  const updates = pagesToProduceString.trim().split(/\r?\n/g).map(update => {
    return update.split(",").map(Number)
  });

  return { rules: rulesDict, updates };
};

// for every page in the update, 
// check if it's before the page defined in the page's rule
const isUpdateCorrectOrder = (update: Array<number>, rules: RuleDictType) => {
  return update.every((currentPage, index) => {
    const pageRules = rules[currentPage]
    //if no rule for the current page, skip it
    if (!pageRules) return true
    return pageRules.every(pageRule => {
      const pageRuleIndex = update.indexOf(pageRule)
      //only check indexes if pageRule is in the update
      return pageRuleIndex < 0 || pageRuleIndex > index
    })
  })
}
/*
Part one
*/
export const p1 = (inputString: string) => {
  const { rules, updates } = prepareData(inputString);

  const middles = updates.map(update => {
    return isUpdateCorrectOrder(update, rules) ?
      update[Math.floor(update.length / 2)] : 0
  })
  return middles.reduce((sum, curr) => sum + curr)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};