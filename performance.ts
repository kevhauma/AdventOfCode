import fs from "node:fs";

const inputPath = `./2024/day01/input.txt`;

const { p1, p2 } = await import(`./2024/day03/puzzle.ts`);

const inputstring = fs.readFileSync(inputPath, { encoding: "utf8" });

Deno.bench({
  name: "Read",
  fn: () => {
    fs.readFileSync(inputPath, { encoding: "utf8" });
  },
});

Deno.bench({
  name: "part-1",
  fn: () => {
    p1(inputstring);
  },
});

Deno.bench({
  name: "part-2",
  fn: () => {
    p2(inputstring);
  },
});
