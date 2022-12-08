const fs = require("fs");

const visibleLeftCheck = (_d, _i, _x, _y, _h) => _i > 0 && _d[_y][_i] < _h;
const visibleRightCheck = (_d, _i, _x, _y, _h) =>
  _i < _d[0].length - 1 && _d[_y][_i] < _h;
const visibleTopCheck = (_d, _i, _x, _y, _h) => _i > 0 && _d[_i][_x] < _h;
const visibleBottomCheck = (_d, _i, _x, _y, _h) =>
  _i < _d.length - 1 && _d[_i][_x] < _h;

//LeftCheck
const vLC = {
  target: (_x, _y, _i) => _i < _x,
  tall: (_d, _x, _y, _i, _t) => (_d[_y][_i] > _t ? _d[_y][_i] : _t),
};
//RightCheck
const vRC = {
  target: (_x, _y, _i) => _i > _x,
  tall: (_d, _x, _y, _i, _t) => (_d[_y][_i] > _t ? _d[_y][_i] : _t),
};
//TopCheck
const vTC = {
  target: (_x, _y, _i) => _i < _y,
  tall: (_d, _x, _y, _i, _t) => (_d[_i][_x] > _t ? _d[_i][_x] : _t),
};
//BottomCheck
const vBC = {
  target: (_x, _y, _i) => _i > _y,
  tall: (_d, _x, _y, _i, _t) => (_d[_i][_x] > _t ? _d[_i][_x] : _t),
};

const prepareData = () => {
  return fs
    .readFileSync("./day8/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((c) => c.split("").map((t) => parseInt(t)));
};

/*
Part one
*/

const checkVisibility = (data, x, y, _index, minus, targetCheck, tallCheck) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length) return true;

  let index = _index;
  let tallestTree = 0;
  while (targetCheck(x, y, index) && tallestTree < height) {
    tallestTree = tallCheck(data, x, y, index, tallestTree);
    minus ? --index : ++index;
  }
  return tallestTree < height;
};

const isVisibleFromLeft = (...p) =>
  checkVisibility(...p, 0, false, vLC.target, vLC.tall);

const isVisibleFromRight = (...p) =>
  checkVisibility(...p, p[0][0].length - 1, true, vRC.target, vRC.tall);

const isVisibleFromTop = (...p) => {
  checkVisibility(...p, 0, false, vTC.target, vTC.tall);
};

const isVisibleFromBottom = (...p) => {
  checkVisibility(...p, p[0].length - 1, true, vBC.target, vBC.tall);
};

const p1 = () =>
  prepareData().reduce(
    (count, _, y, array) =>
      count +
      array[y].filter(
        (_, x) =>
          isVisibleFromBottom(array, x, y) ||
          isVisibleFromTop(array, x, y) ||
          isVisibleFromLeft(array, x, y) ||
          isVisibleFromRight(array, x, y)
      ).length,
    0
  );

/*
Part two
*/
const countVisibleTrees = (data, x, y, _index, minus, check) => {
  const height = data[y][x];
  if (!y || !x || y === data.length - 1 || x === data[y].length - 1) return 0;

  let index = _index;
  let amountOfTrees = 1;
  while (check(data, index, x, y, height)) {
    minus ? --index : ++index;
    ++amountOfTrees;
  }
  return amountOfTrees;
};
const treesVisibleOnLeft = (...params) =>
  countVisibleTrees(...params, params[1] - 1, true, visibleLeftCheck);

const treesVisibleOnRight = (...params) =>
  countVisibleTrees(...params, params[1] + 1, false, visibleRightCheck);

const treesVisibleOnTop = (...params) =>
  countVisibleTrees(...params, params[2] - 1, true, visibleTopCheck);

const treesVisibleOnBottom = (...params) =>
  countVisibleTrees(...params, params[2] + 1, false, visibleBottomCheck);

const p2 = () =>
  prepareData().data.reduce((max, _, y, array) => {
    const counts = array[y].map(
      (_, x) =>
        treesVisibleOnTop(array, x, y) *
        treesVisibleOnLeft(array, x, y) *
        treesVisibleOnBottom(array, x, y) *
        treesVisibleOnRight(array, x, y)
    );

    let maxInRow = Math.max(...counts);
    return maxInRow > max ? maxInRow : max;
  }, 0);

module.exports = { p1, p2 };
