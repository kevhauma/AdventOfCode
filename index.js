const fs = require("fs");

const FIRST_ARG = process.argv[2]

const folders = fs.readdirSync("./").sort().filter(f=> f.includes("day"));
const folders_to_exec = FIRST_ARG === 'all' ? folders : folders.reverse().slice(0,1)

folders_to_exec.forEach((folder) => {
  const { p1, p2 } = require(`./${folder}/puzzle.js`);
  console.log(`===== Excuting ${folder} =====`);

  console.time("Epoch Part 1");
  const r1 = p1();
  console.log(`Part 1:\t\t ${r1}`);
  console.timeEnd("Epoch Part 1");

  console.time("Epoch Part 2");
  const r2 = p2();
  console.log(`Part 2:\t\t ${r2}`);
  console.timeEnd("Epoch Part 2");

  console.log();
});
