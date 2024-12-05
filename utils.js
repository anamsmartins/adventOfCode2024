import { readFileSync } from "fs";
const inputPath = "input.txt";

export function readInput() {
  return readFileSync(inputPath, "utf8");
}

export function occurInArray(array, value) {
  var total = 0;
  array.forEach((element) => {
    if (element == value) {
      total++;
    }
  });
  return total;
}

export function swapArrayElements(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
