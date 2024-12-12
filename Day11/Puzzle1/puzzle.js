import { readInput } from "../../utils.js";

var input = readInput();

var stones = input.split(" ").map((x) => parseInt(x));

var blinks = 25;

for (var i = 0; i < blinks; i++) {
  for (var s = 0; s < stones.length; s++) {
    if (stones[s] == 0) {
      stones[s] = 1;
      continue;
    }

    var stoneString = stones[s].toString();
    if (i == 0) {
      var lengthDivision = stoneString.length % 2;
      console.log(
        "String: " +
          stoneString +
          "; Length: " +
          stoneString.length +
          "; length % 2: " +
          lengthDivision
      );
    }
    if (stoneString.length % 2 == 0) {
      var firstHalf = parseInt(stoneString.slice(0, stoneString.length / 2));
      var secondHalf = parseInt(
        stoneString.slice(stoneString.length / 2, stoneString.length)
      );
      if (i == 0) {
        console.log(
          "First half: " + firstHalf + "; Second Half: " + secondHalf
        );
      }
      stones[s] = firstHalf;
      stones.splice(s + 1, 0, secondHalf);
      s++;
      continue;
    }

    stones[s] *= 2024;
  }
}

console.log(stones.length);
