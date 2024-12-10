import { readInput } from "../../utils.js";

var input = readInput();

var multiplications = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
var total = 0;

multiplications.forEach((multiplication) => {
  var numbers = multiplication.match(/\d+/g);
  total += numbers[0] * numbers[1];
});

console.log(total);
