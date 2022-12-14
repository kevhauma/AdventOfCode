const fs = require("fs");

const bInt = (value, bigInt) => (bigInt ? BigInt(value) : value);

const prepareData = (inputPath) => {
  return fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/\r?\n\r?\n\s*/g)
    .filter(Boolean)
    .map((monkey) => {
      let parsedMonkey = { receivedItems: [], inspectedCount: 0 };
      const monkeyParts = monkey
        .trim()
        .split(/\r?\n/g)
        .map((x) => x.trim());

      parsedMonkey.name = parseInt(monkeyParts[0].replace(/[^0-9]/g, ""));
      parsedMonkey.startingItems = monkeyParts[1]
        .split(":")[1]
        .split(",")
        .map((x) => parseInt(x.trim()));

      const operationNumber = parseInt(monkeyParts[2].replace(/[^0-9]/g, ""));
      if (!operationNumber || isNaN(operationNumber))
        parsedMonkey.op = (old) => old * old;
      else if (monkeyParts[2].includes("+"))
        parsedMonkey.op = (old, bigInt) => old + bInt(operationNumber, bigInt);
      else if (monkeyParts[2].includes("*"))
        parsedMonkey.op = (old, bigInt) => old * bInt(operationNumber, bigInt);

      parsedMonkey.test = parseInt(monkeyParts[3].replace(/[^0-9]/g, ""));
      parsedMonkey.true = parseInt(monkeyParts[4].replace(/[^0-9]/g, ""));
      parsedMonkey.false = parseInt(monkeyParts[5].replace(/[^0-9]/g, ""));

      return parsedMonkey;
    })
    .sort((a, b) => a.name - b.name);
};

const findMonkey = (monkeys, name) => {
  return monkeys.find((m) => m.name === name);
};
/*
Part one
*/

const p1 = (inputPath) => {
  //do for 20 rounds:
  //monkey "operates item", changes worry level, add 1 to count
  // worry levels get divided by 3, Math.floor
  //test item
  //throw to new monkey, -- to received items--
  //--received items to starting items --
  // (no need to swap, monkeys check items received in current round)

  //after 20 rounds: find and sum the top 2 monkeys

  const ROUNDS = 20;
  const monkeys = prepareData(inputPath);
  Array.from(Array(ROUNDS)).forEach((_, round) => {
    monkeys.forEach((mon) => {
      mon.startingItems.forEach((item) => {
        mon.inspectedCount += 1;

        const inspectionWorry = mon.op(item);

        const reliefWorry = Math.floor(inspectionWorry / 3);

        let monkeyToThrowTo = null;
        const isDivisible = !(reliefWorry % mon.test);

        if (isDivisible) monkeyToThrowTo = findMonkey(monkeys, mon.true);
        else monkeyToThrowTo = findMonkey(monkeys, mon.false);

        monkeyToThrowTo.startingItems.push(reliefWorry);
      });
      mon.startingItems = [];
    });
  });
  const [firstPlace, secondPlace] = monkeys
    .sort((a, b) => b.inspectedCount - a.inspectedCount)
    .map((x) => x.inspectedCount);
  return firstPlace * secondPlace;
};

/*F
Part two
*/
const p2 = (inputPath) => {
  const ROUNDS = 10000;
  const monkeys = prepareData(inputPath);
  //kinda stolen by https://github.com/CodingAP/advent-of-code/blob/main/profiles/github/2022/day11/solution.js
  //get highest value of starting data?
  let highestValue = monkeys.reduce(
    (value, monkey) => (value *= BigInt(monkey.test)),
    1n
  );

  Array.from(Array(ROUNDS)).forEach((_, round) => {
    monkeys.forEach((mon) => {
      mon.startingItems.forEach((item) => {
        mon.inspectedCount += 1;

        const inspectionWorry = mon.op(BigInt(item), true);

        //number has no extra useful data above the highest value possible
        const reliefWorry = inspectionWorry % highestValue;

        let monkeyToThrowTo = null;
        const isDivisible = !(reliefWorry % BigInt(mon.test));

        if (isDivisible) monkeyToThrowTo = findMonkey(monkeys, mon.true);
        else monkeyToThrowTo = findMonkey(monkeys, mon.false);

        monkeyToThrowTo.startingItems.push(reliefWorry);
      });
      mon.startingItems = [];
    });
  });
  const [firstPlace, secondPlace] = monkeys
    .sort((a, b) => b.inspectedCount - a.inspectedCount)
    .map((x) => x.inspectedCount);
  return firstPlace * secondPlace;
};

module.exports = { p1, p2 };
