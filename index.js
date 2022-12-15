const fs = require("fs");

const FIRST_ARG = process.argv[2];
const SECOND_ARG = process.argv[3];

const folders = fs
  .readdirSync("./")
  .sort()
  .filter((f) => f.includes("day"));
const folders_to_exec =
  FIRST_ARG === "all" ? folders :  folders.reverse().slice(0, 1);
const isTest = SECOND_ARG === "test" ? "test" : "input";

const times = [["day  :"], ["part1:"], ["part2:"]];
const totalPerf1 = performance.now()
folders_to_exec.forEach((folder) => {
  const { p1, p2 } = require(`./${folder}/puzzle.js`);
  console.log(`===== Excuting ${folder} =====`);
  const inputFile = `./${folder}/${isTest}.txt`;

  const t1p1 = performance.now();
  const r1 = p1(inputFile);
  console.log(`Part 1:\t ${r1}`);
  const t2p1 = performance.now();
  const perfP1 = durationFormat(t2p1 - t1p1);
  console.log(perfP1);

  const t1p2 = performance.now();
  const r2 = p2(inputFile);
  console.log(`Part 2:\t ${r2}`);
  const t2p2 = performance.now();
  const perfP2 = durationFormat(t2p2 - t1p2);
  console.log(perfP2);

  console.log();
  times[0].push(folder + " ");
  times[1].push(perfP1);
  times[2].push(perfP2);
});
const totalPerf2 = performance.now();
times.forEach((time) => {
  console.log(time.join("\t | "));
});

console.log("===***==***==")
console.log("totalTime for AoC-2022:",durationFormat(totalPerf2-totalPerf1))


function durationFormat(ms) {
  const seconds = Math.floor(ms / 1000);
  const remainingMillis = ms % 1000;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours ? `${hours}h ` : ""}${
    remainingMinutes ? `${remainingMinutes}m ` : ""
  }${
    remainingSeconds ? `${remainingSeconds}${remainingMillis ? "" : "s"}` : ""
  }${
    !remainingMillis
      ? ""
      : !remainingSeconds
      ? `${remainingMillis.toFixed(3)}ms `
      : `.${Math.floor(remainingMillis)}s`
  }`;
}
