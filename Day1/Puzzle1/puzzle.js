// Day 1 Puzzle 1
import { readInput } from "../../utils.js";

var input = readInput();

var leftList = [];
var rightList = [];
var rows = input.split("\n");
var totalDifference = 0;

rows.forEach((row) => {
  var ids = row.trim().split(/\s+/);
  leftList.push(parseInt(ids[0]));
  rightList.push(parseInt(ids[1]));
});

leftList = leftList.sort();
rightList = rightList.sort();

leftList.forEach((locationId, index) => {
  totalDifference += Math.abs(locationId - rightList[index]);
});

console.log(totalDifference);
