import fs from "node:fs";

import { tryImport } from "./scripts/tryImport.ts";
import { readFolders } from "./scripts/readFolders.ts";

const { txtFile, folders, year } = readFolders();

for (const folder of folders) {
  const { p1, p2 } = await tryImport(`${year}/${folder}/puzzle`);

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
    fn: () => {
      p1(inputstring);
    },
  });

  Deno.bench({
    name: `${year}/${folder}: Part 2`,
    fn: () => {
      p2(inputstring);
    },
  });
}
