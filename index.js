const fs = require("fs");

const folders = fs.readdirSync("./");
folders.sort().forEach((folder) => {
  if (!folder.includes(".")) {
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
  }
});
