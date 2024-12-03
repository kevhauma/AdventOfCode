import fs from "node:fs";
import { parseArgs } from "@std/parse-args";

export const readFolders = () => {
  const flags = parseArgs(Deno.args, {
    string: ["last", "test", "day", "year"],
  });
  console.log(flags);
  const isTest = flags._.includes("test");
  const isLast = flags._.includes("last");

  const year = flags.year || new Date().getFullYear();

  const folders = fs
    .readdirSync(`./${year}/`)
    .sort()
    .filter((f) => f.includes("day"));

  const txtFile = isTest ? "test" : "input";
  let folders_to_exec = folders;

  if (isLast) {
    folders_to_exec = [folders.findLast(() => true) || ""];
  } else if (flags.day) {
    folders_to_exec = folders.filter(
      (folder) => folder === `day${flags.day?.padStart(2, "0")}`
    );
  }
  return { txtFile, year, folders: folders_to_exec };
};
