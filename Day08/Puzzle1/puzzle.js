import {
  readInput,
  getInputMatrix,
  generateMatrix,
  occurInMatrix,
  getElementsPositionsMapFromMatrix,
} from "../../utils.js";

var input = readInput();

var inputMatrix = getInputMatrix(input);

// Generate frequency positions Map
var frequencyPositions = getElementsPositionsMapFromMatrix(inputMatrix, ["."]);

console.log(frequencyPositions);

var nRows = inputMatrix.length;
var nColumns = inputMatrix[0].length;

// Initialize Antinodes Matrix
var antinodesMatrix = generateMatrix(nRows, nColumns);

for (let [_, positions] of frequencyPositions) {
  for (var p = 0; p < positions.length; p++) {
    var otherFrequencyPositions = [...positions];
    otherFrequencyPositions.splice(p, 1);

    var position = positions[p];

    for (var o = 0; o < otherFrequencyPositions.length; o++) {
      // Calculate distance coordinates
      var otherPosition = otherFrequencyPositions[o];
      var d = [otherPosition[0] - position[0], otherPosition[1] - position[1]];

      // Calculate and add antinode 1
      var antinode1 = [position[0] - d[0], position[1] - d[1]];
      if (
        antinode1[0] < 0 ||
        antinode1[0] > nRows - 1 ||
        antinode1[1] < 0 ||
        antinode1[1] > nColumns - 1
      ) {
        continue;
      }
      antinodesMatrix[antinode1[0]][antinode1[1]] = "#";

      // Calculate and add antinode 2
      var antinode2 = [otherPosition[0] + d[0], otherPosition[1] + d[1]];
      if (
        antinode2[0] < 0 ||
        antinode2[0] > nRows - 1 ||
        antinode2[1] < 0 ||
        antinode2[1] > nColumns - 1
      ) {
        continue;
      }
      antinodesMatrix[antinode2[0]][antinode2[1]] = "#";
    }
  }
}

console.log(occurInMatrix(antinodesMatrix, "#"));
