import { parseArgs } from "@std/parse-args";

const flags = parseArgs(Deno.args, {
  string: ["day", "year"],
});

const date = new Date();

const year = isNaN(Number(flags.year))
  ? date.getFullYear()
  : Number(flags.year);
const day = isNaN(Number(flags.day)) ? date.getDate() : Number(flags.day);

const folderName = `./${year}/day${day.toString().padStart(2, "0")}`;

Deno.mkdirSync(folderName);

const template = `const prepareData = (inputString: string) => {
  const lines = inputString.split(/\\r?\\n/g).filter(Boolean);

  return lines;
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const data = prepareData(inputString);
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};`;

Deno.writeTextFileSync(`${folderName}/puzzle.ts`, template);
Deno.writeTextFileSync(`${folderName}/input.txt`, "input");
Deno.writeTextFileSync(`${folderName}/test.txt`, "test input");
