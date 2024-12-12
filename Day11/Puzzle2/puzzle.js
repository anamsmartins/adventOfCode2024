import { readInput } from "../../utils.js";

var input = readInput();

var stones = input.split(" ").map(Number);
var blinks = 75;
var stonesMap = new Map();

// Initialize Stones Map with count 1
stones.forEach((stone) => {
  if (stonesMap.get(stone)) {
    stonesMap.set(stone, stonesMap.get(stone) + 1);
  }
  stonesMap.set(stone, 1);
});

for (var i = 0; i < blinks; i++) {
  var newStones = new Map();

  // for each stone add to the newstones with existing count with the stones map count
  for (let [stone, count] of stonesMap) {
    if (stone == 0) {
      newStones.set(1, newStones.get(1) ? newStones.get(1) + count : count);
      continue;
    }

    if (stone.toString().length % 2 == 0) {
      var stoneString = stone.toString();
      var leftNumber = parseInt(stoneString.slice(0, stoneString.length / 2));
      var rightNumber = parseInt(
        stoneString.slice(stoneString.length / 2, stoneString.length)
      );
      newStones.set(
        leftNumber,
        newStones.get(leftNumber) ? newStones.get(leftNumber) + count : count
      );
      newStones.set(
        rightNumber,
        newStones.get(rightNumber) ? newStones.get(rightNumber) + count : count
      );
      continue;
    }

    var stoneMultiplied = stone * 2024;
    newStones.set(
      stoneMultiplied,
      newStones.get(stoneMultiplied)
        ? newStones.get(stoneMultiplied) + count
        : count
    );
  }

  // Update stones map with new counts
  stonesMap = newStones;
}

// Count total of stones
var totalStones = 0;
for (let [_, count] of stonesMap) {
  totalStones += count;
}
console.log(totalStones);
