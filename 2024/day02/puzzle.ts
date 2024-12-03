const prepareData = (inputString: string) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);

  return lines.map((line) => line.split(/\s+/g).map((num) => parseInt(num)));
};

const isReportSafe = (report: Array<number>) => {
  const { isSafe } = report.reduce(
    (result, current, index) => {
      if (!result.isSafe) return { isSafe: false };
      if (index === 0) return { isSafe: true };

      const difference = report[index - 1] - current;

      const isSafelyDecreasing = difference > 0 && difference <= 3;
      const isSafelyIncreasing = difference < 0 && difference >= -3;

      if (!isSafelyDecreasing && !isSafelyIncreasing) return { isSafe: false };

      //if no direction set, return safe
      if (result.isDecreasing === undefined) {
        return { isSafe: true, isDecreasing: isSafelyDecreasing };
      }
      //isSafe and decreasing
      if (result.isDecreasing && isSafelyDecreasing) {
        return { isSafe: true, isDecreasing: true };
      }
      //isSafe and increasing
      if (!result.isDecreasing && isSafelyIncreasing) {
        return { isSafe: true, isDecreasing: false };
      }
      //is not safe
      return { isSafe: false };
    },
    { isSafe: true } as { isSafe: boolean; isDecreasing?: boolean }
  );
  return isSafe;
};

const isSafeWithTolerance = (report: number[]): boolean => {
  //Thanks grYs51 ≽^•⩊•^≼
  if (isReportSafe(report)) {
    return true;
  }
  for (let i = 0; i < report.length; i++) {
    const newReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isReportSafe(newReport)) {
      return true;
    }
  }
  return false;
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const data = prepareData(inputString);
  const reportResults = data.filter(isReportSafe);
  return reportResults.length;
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
  const reportResults = data.filter(isSafeWithTolerance);
  return reportResults.length;
};
