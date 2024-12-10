// Day 1 Puzzle 1
import { readInput, occurInArray } from "../../utils.js";

var input = readInput();

var leftList = [];
var rightList = [];
var rows = input.split("\n");
var totalSimilarity = 0;

rows.forEach((row) => {
  var ids = row.trim().split(/\s+/);
  leftList.push(parseInt(ids[0]));
  rightList.push(parseInt(ids[1]));
});

leftList.forEach((locationId) => {
  totalSimilarity += locationId * occurInArray(rightList, locationId);
});

console.log(totalSimilarity);
