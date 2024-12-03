const prepareData = (inputString) => {
  return inputString
    .trim()
    .split(/\r?\n/g)
    .map((l) => {
      const [name, opOrValue] = l.split(":");
      if (isNaN(parseInt(opOrValue))) {
        const [first, op, second] = opOrValue.trim().split(" ");
        return { name, calc: { first, op, second } };
      } else return { name, value: parseInt(opOrValue) };
    })
    .reduce(
      (obj, curr) => ({
        ...obj,
        [curr.name]: { value: curr.value, calc: curr.calc },
      }),
      {}
    );
};
const doOp = (first, op, second) => {
  console.log(first, op, second);
  switch (op) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return first / second;
  }
};
const getValue = (monkeys, monkey, part2) => {
  const monkeyObject = monkeys[monkey];
  if (part2 && monkey === "humn") {
    monkeyObject.me = true;
    return { value: monkeyObject.value, me: true };
  }
  if (monkeyObject.value !== undefined)
    return { value: monkeyObject.value, me: false };

  const { value: fValue, me: fMe } = getValue(
    monkeys,
    monkeyObject.calc.first,
    part2
  );
  const { value: sValue, me: sMe } = getValue(
    monkeys,
    monkeyObject.calc.second,
    part2
  );

  let value = doOp(fValue, monkeyObject.calc.op, sValue);

  monkeyObject.value = value;
  monkeyObject.me = fMe || sMe;
  return { value, me: fMe || sMe };
};

/*
Part one
*/
export const p1 = (inputString) => {
  const monkeys = prepareData(inputString);
  return getValue(monkeys, "root").value;
};

const getReverseOp = (op) => {
  switch (op) {
    case "+":
      return "-";
    case "-":
      return "+";
    case "*":
      return "/";
    case "/":
      return "*";
  }
};
const getReverseValue = (monkeys, monkey, valueToBe) => {
  //   console.log("======***======")
  // console.log(monkey, valueToBe);
  if (monkey === "humn") return valueToBe;
  const monkeyObject = monkeys[monkey];
  // console.log(monkeyObject);
  // console.log(monkeys[monkeyObject.calc.first]);
  // console.log(monkeys[monkeyObject.calc.second]);
  if (monkeys[monkeyObject.calc.first].me) {
    const op = getReverseOp(monkeyObject.calc.op);
    const value = monkeys[monkeyObject.calc.second].value;
    const nextValue = doOp(valueToBe, op, value);
    return getReverseValue(monkeys, monkeyObject.calc.first, nextValue);
  } else {
    const op = getReverseOp(monkeyObject.calc.op);
    const value = monkeys[monkeyObject.calc.first].value;
    const nextValue = doOp(valueToBe, op, value);
    return getReverseValue(monkeys, monkeyObject.calc.second, nextValue);
  }
};

/*
Part two
*/
export const p2 = (inputString) => {
  const monkeys = prepareData(inputString);
  const root = monkeys["root"];
  getValue(monkeys, "root", true);
  const first = monkeys[root.calc.first];
  const second = monkeys[root.calc.second];

  if (first.me) {
    return getReverseValue(monkeys, root.calc.first, second.value);
  } else return getReverseValue(monkeys, root.calc.second, first.value);
};
