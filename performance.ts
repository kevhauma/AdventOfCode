import fs from "node:fs";

import { readFolders } from "./scripts/readFolders.ts";
import { tryImport } from "./scripts/tryImport.ts";

type FunctionEntryType = [string, (str: string) => unknown]

const { txtFile, folders, year } = readFolders();

for (const folder of folders) {
  const { p1, p2, ...otherFunctions } = await tryImport(
    `${year}/${folder}/puzzle`
  );

  const inputPath = `./${year}/${folder}/${txtFile}.txt`;
  const inputstring = fs.readFileSync(inputPath, { encoding: "utf8" });

  const oterhPart1s = Object.entries(otherFunctions).filter(([functionName]) => functionName.includes("1")) as Array<FunctionEntryType>
  const oterhPart2s = Object.entries(otherFunctions).filter(([functionName]) => functionName.includes("2")) as Array<FunctionEntryType>

  Deno.bench({
    name: `${year}/${folder}: Read File`,
    fn: () => {
      fs.readFileSync(inputPath, { encoding: "utf8" });
    },
  });

  Deno.bench({
    name: `${year}/${folder}: Own`,
    group: "Part 1",
    baseline: true,
    fn: () => {
      p1(inputstring);
    },
  });

  Deno.bench({
    name: `${year}/${folder}: Own`,
    group: "Part 2",
    baseline: true,
    fn: () => {
      p2(inputstring);
    },
  });

  oterhPart1s.forEach(([funcName, func]) => {
    Deno.bench({
      name: `${year}/${folder}: ${funcName}`,
      group: "Part 1",
      fn: () => {
        func(inputstring);
      },
    });
  })

  oterhPart2s.forEach(([funcName, func]) => {
    Deno.bench({
      name: `${year}/${folder}: ${funcName}`,
      group: "Part 2",
      fn: () => {
        func(inputstring);
      },
    });
  })


}
