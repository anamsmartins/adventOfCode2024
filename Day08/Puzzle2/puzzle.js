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

var nRows = inputMatrix.length;
var nColumns = inputMatrix[0].length;

// Initialize Antinodes Matrix
var antinodesMatrix = generateMatrix(nRows, nColumns);

for (let [_, positions] of frequencyPositions) {
  for (var p = 0; p < positions.length; p++) {
    var otherFrequencyPositions = [...positions];
    otherFrequencyPositions.splice(p, 1);

    var position = positions[p];

    // Add antenna position as node
    antinodesMatrix[position[0]][position[1]] = "#";

    for (var o = 0; o < otherFrequencyPositions.length; o++) {
      // Reset position and fetch next position
      var position = positions[p];
      var otherPosition = otherFrequencyPositions[o];

      // Calculate distance coordinates
      var d = [otherPosition[0] - position[0], otherPosition[1] - position[1]];

      // Reset boolean values
      var checkedAllRecursivePosition = false;
      var checkedAllRecursiveOtherPosition = false;

      while (
        !checkedAllRecursivePosition ||
        !checkedAllRecursiveOtherPosition
      ) {
        console.log(
          "Position: " +
            position +
            "; OtherPosition: " +
            otherPosition +
            ", d: " +
            d
        );

        if (!checkedAllRecursivePosition) {
          // Calculate and add antinode 1
          var antinode1 = [position[0] - d[0], position[1] - d[1]];
          position = [antinode1[0], antinode1[1]];
          if (
            antinode1[0] < 0 ||
            antinode1[0] > nRows - 1 ||
            antinode1[1] < 0 ||
            antinode1[1] > nColumns - 1
          ) {
            checkedAllRecursivePosition = true;
          } else {
            antinodesMatrix[antinode1[0]][antinode1[1]] = "#";
          }
        }

        if (!checkedAllRecursiveOtherPosition) {
          // Calculate and add antinode 2
          var antinode2 = [otherPosition[0] + d[0], otherPosition[1] + d[1]];
          otherPosition = [antinode2[0], antinode2[1]];
          if (
            antinode2[0] < 0 ||
            antinode2[0] > nRows - 1 ||
            antinode2[1] < 0 ||
            antinode2[1] > nColumns - 1
          ) {
            checkedAllRecursiveOtherPosition = true;
            continue;
          }
          antinodesMatrix[antinode2[0]][antinode2[1]] = "#";
        }
      }
    }
  }
}

console.log(occurInMatrix(antinodesMatrix, "#"));
