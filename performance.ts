import fs from "node:fs";

import { tryImport } from "./scripts/tryImport.ts";
import { readFolders } from "./scripts/readFolders.ts";

const { txtFile, folders, year } = readFolders();

for (const folder of folders) {
  const { p1, p2, partOne, partTwo } = await tryImport(
    `${year}/${folder}/puzzle`
  );

  const inputPath = `./${year}/${folder}/${txtFile}.txt`;
  const inputstring = fs.readFileSync(inputPath, { encoding: "utf8" });

  Deno.bench({
    name: `${year}/${folder}: Read File`,
    fn: () => {
      fs.readFileSync(inputPath, { encoding: "utf8" });
    },
  });

  Deno.bench({
    name: `${year}/${folder}: Part 1`,
    group: "Part 1",
    baseline: true,
    fn: () => {
      p1(inputstring);
    },
  });

  Deno.bench({
    name: `${year}/${folder}: Part 2`,
    group: "Part 2",
    baseline: true,
    fn: () => {
      p2(inputstring);
    },
  });
  if (partOne)
    Deno.bench({
      name: `${year}/${folder}: Part 1 - Other`,
      group: "Part 1",
      fn: () => {
        partOne(inputstring);
      },
    });
  if (partTwo)
    Deno.bench({
      name: `${year}/${folder}: Part 2 - Other`,
      group: "Part 2",
      fn: () => {
        partTwo(inputstring);
      },
    });
}
