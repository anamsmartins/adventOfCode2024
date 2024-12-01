import { readFileSync } from "fs";
const inputPath = "input.txt";

export function readInput() {
  return readFileSync(inputPath, "utf8");
}
