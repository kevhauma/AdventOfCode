const fs = require("fs");

const FIRST_ARG = process.argv[2];

const folders = fs
  .readdirSync("./")
  .sort()
  .filter((f) => f.includes("day"));
const folders_to_exec =
  FIRST_ARG === "all" ? folders : folders.reverse().slice(0, 1);

const times = [["day  :"], ["part1:"], ["part2:"]];
folders_to_exec.forEach((folder) => {
  const { p1, p2 } = require(`./${folder}/puzzle.js`);
  console.log(`===== Excuting ${folder} =====`);

  const t1p1 = performance.now();
  const r1 = p1();
  console.log(`Part 1:\t ${r1}`);
  const t2p1 = performance.now();

  const t1p2 = performance.now();
  const r2 = p2();
  console.log(`Part 2:\t ${r2}`);
  const t2p2 = performance.now();

  console.log();
  times[0].push(folder + " ");
  times[1].push((t2p1 - t1p1).toFixed(3) + "ms");
  times[2].push((t2p2 - t1p2).toFixed(3) + "ms");
});

times.forEach((time) => {
  console.log(time.join("\t | "));
});
