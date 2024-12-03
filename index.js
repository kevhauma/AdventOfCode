import fs from "node:fs";

const FIRST_ARG = process.argv[2];
const SECOND_ARG = process.argv[3];
const year = process.argv[4] || new Date().getFullYear();

const folders = fs
  .readdirSync(`./${year}/`)
  .sort()
  .filter((f) => f.includes("day"));

const secondArgNumber = parseInt(SECOND_ARG);
const txtFile = FIRST_ARG === "test" ? "test" : "input";
let folders_to_exec = folders;
if (!isNaN(secondArgNumber))
  folders_to_exec = folders.slice(secondArgNumber - 1, secondArgNumber);
else if (SECOND_ARG === "last") folders_to_exec = folders.reverse().slice(0, 1);

const times = [
  ["day  :\t"],
  ["read:\t"],
  ["part1:\t"],
  ["part2:\t"],
  ["total:\t"],
];

const totalPerf1 = performance.now();
folders_to_exec.forEach(async (folder) => {
  const { p1, p2 } = await import(`./${year}/${folder}/puzzle.ts`);
  console.log(`===== Excuting ${folder} =====`);
  const inputPath = `./${year}/${folder}/${txtFile}.txt`;
  const ioT1 = performance.now();
  const inputstring = fs.readFileSync(inputPath, { encoding: "utf8" });
  const ioT2 = performance.now();
  const perfIO = durationFormat(ioT2 - ioT1);
  console.log("IO:", perfIO);
  const t1p1 = performance.now();
  const r1 = p1(inputstring, inputPath);
  console.log(`Part 1:\t ${r1}`);
  const t2p1 = performance.now();
  const perfP1 = durationFormat(t2p1 - t1p1);
  console.log("P1", perfP1);

  const t1p2 = performance.now();
  const r2 = p2(inputstring, inputPath);
  console.log(`Part 2:\t ${r2}`);
  const t2p2 = performance.now();
  const perfP2 = durationFormat(t2p2 - t1p2);
  console.log("P2:", perfP2);

  console.log();
  times[0].push(folder + " ");
  times[1].push(perfIO);
  times[2].push(perfP1);
  times[3].push(perfP2);
  times[4].push(durationFormat(t2p2 - ioT1));
});
const totalPerf2 = performance.now();
times.forEach((time) => {
  console.log(time.join("\t | "));
});

console.log("===***==***==");
console.log(
  `totalTime for AoC-${year}:`,
  durationFormat(totalPerf2 - totalPerf1)
);

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
