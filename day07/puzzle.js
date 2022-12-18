const fs = require("fs");
const COUNT_LIMIT = 100000;
const STORAGE_LIMIT = 70000000;
const FREE_SPACE_GOAL = 30000000;
const prepareData = (inputString,inputPath) => {
  const data = fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .split(/\$/g)
    .map((c) => c.trim().replace(/\r?\n/g, ","))
    .filter(Boolean);

  const path = ["."];
  const sizes = [];
  data.forEach((command) => {
    if (command.startsWith("cd")) {
      const cdPath = command.replace("cd ", "");
      if (cdPath === "/") return;
      if (cdPath === "..") path.pop();
      else path.push(cdPath);
    }
    if (command.startsWith("ls")) {
      const itemsInFolder = command.replace("ls,", "").split(",");
      sizes.push(readDir(path.join("/"), itemsInFolder));
    }
  });
  const totalSizes = sizes.map(({ dir, size }) => {
    let totalSize = size;
    sizes.forEach((other) => {
      if (other.dir.includes(dir) && dir !== other.dir) {
        totalSize += other.size;
      }
    });
    return { dir, size: totalSize };
  });

  return totalSizes;
};

function readDir(dir, data) {
  let localTotal = 0;
  for (let file of data) {
    if (!file.startsWith("dir")) {
      let lines = parseInt(file.replace(/[^0-9]/g, ""));
      localTotal += lines;
    }
  }
  return { dir, size: localTotal };
}

/*
Part one
*/

const p1 = (inputString,inputPath) => {
  const data = prepareData(inputString,inputPath);

  return data.reduce((sum, current) => {
    return current.size > COUNT_LIMIT ? sum : sum + current.size;
  }, 0);
};
/*
Part two
*/
const p2 = (inputString,inputPath) => {
  const data = prepareData(inputString,inputPath);

  const { size: totalUsed } = data.find(({ dir }) => dir === ".");
  const spaceFree = STORAGE_LIMIT - totalUsed;
  const amountToDelete = FREE_SPACE_GOAL - spaceFree;
  const smallest = data
    .filter(({ size, dir }) => size > amountToDelete)
    .sort((a, b) => a.size - b.size)
    .shift();
  //console.log(smallest);
  return smallest.size;
};

module.exports = { p1, p2 };
