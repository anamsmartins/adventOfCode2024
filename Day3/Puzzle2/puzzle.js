import { readInput } from "../../utils.js";

var input = readInput();

var multiplications = input.match(/mul\(\d{1,3},\d{1,3}\)|don\'t\(\)|do\(\)/g);
console.log(multiplications);
var total = 0;
var doCondition = true;

multiplications.forEach((multiplication) => {
  if (multiplication == "do()") {
    doCondition = true;
    return;
  }

  if (multiplication == "don't()") {
    doCondition = false;
    return;
  }

  if (doCondition) {
    var numbers = multiplication.match(/\d+/g);
    total += numbers[0] * numbers[1];
  }
});

console.log(total);
