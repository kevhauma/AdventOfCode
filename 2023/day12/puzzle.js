const prepareData = (inputString) => {
  return inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => {
      const [record, checksString] = line.split(" ");
      const checks = checksString.split(",").map((n) => parseInt(n));
      return { record, checks };
    });
};

const countWays = (record, checks) => {
  if (record.length === 0) {
    //1 if true, 0 if not
     return checks.length === 0 * 1
  }
  if (checks.length === 0) {
    // 0 if it has #, 1 if not
    return !(record.split("").some(rec=>rec === "#")) * 1
  }

  const sum = checks.reduce((sum,cur)=>cur+sum)
  if (record.length < sum + checks.length - 1) {
    return 0;
  }

  if (record[0] === ".") {
    return countWays(record.slice(1), checks);
  }
  if (record[0] === "#") {
    const [check, ...leftoverChecks] = checks;
    for (let i = 0; i < check; i++) {
      if (record[i] === ".") {
        return 0;
      }
    }
    if (record[check] === "#") {
      return 0;
    }

    return countWays(record.slice(check + 1), leftoverChecks);
  }

  return (
    countWays("#" + record.slice(1), checks) + countWays("." + record.slice(1), checks)
  );
};

/*
Part one
*/

const p1 = (inputString) => {
  const lines = prepareData(inputString);
  return lines.reduce(
    (total, { record, checks }) => total + countWays(record, checks),
    0
  );
};

/*
Part two
*/
const p2 = (inputString) => {
  const lines = prepareData(inputString);
  return lines
    .map(({ record, checks }) => ({
      record: [record, record, record, record, record].join("?"),
      checks: [...checks, ...checks, ...checks, ...checks, ...checks],
    }))
    .reduce(
      (total, { record, checks }) => total + countWays(record, checks),
      0
    );
};

module.exports = { p1, p2 };
