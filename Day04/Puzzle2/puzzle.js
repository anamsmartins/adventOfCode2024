import { readInput, getInputMatrix } from "../../utils.js";

var input = readInput();

var diagonalWords = 0; // & reversed

// Get rows
var rows = input.split("\n");
var nRows = rows.length;
var nColumns = rows[0].length;

var inputMatrix = getInputMatrix(input);

// Get diagonals
var nDiagonalsPerSide = nRows + nColumns - 1;
var mainDiagonals = [];

// Get left-to-right (main) diagonals
for (let d = 0; d < nDiagonalsPerSide; d++) {
  const diagonal = [];
  for (let i = 0; i < nRows; i++) {
    const j = d - i; // Left to right
    if (j >= 0 && j < nColumns) {
      diagonal.push(inputMatrix[i][j]);
    }
  }
  mainDiagonals.push(diagonal.join(""));
}

function countXMAS(diagonals, x, y, nRows) {
  if (x - 2 < 0 || x + 2 > diagonals.length) {
    return 0;
  }

  if (x < nRows - 2) {
    if (y + 2 > diagonals[x].length) {
      return 0;
    }
    var rightBottom = diagonals[x + 2][y + 2];
  } else if (x == nRows - 2) {
    if (y + 1 > diagonals[x].length) {
      return 0;
    }
    var rightBottom = diagonals[x + 2][y + 1];
  } else if (x == nRows - 1) {
    var rightBottom = diagonals[x + 2][y];
  } else {
    var rightBottom = diagonals[x + 2][y];
  }

  if (x <= nRows - 1) {
    var leftTop = diagonals[x - 2][y];
  } else if (x == nRows) {
    var leftTop = diagonals[x - 2][y + 1];
  } else {
    var leftTop = diagonals[x - 2][y + 2];
  }

  if (
    (leftTop == "S" && rightBottom == "M") ||
    (leftTop == "M" && rightBottom == "S")
  ) {
    return 1;
  }

  return 0;
}

for (let main = 0; main < mainDiagonals.length; main++) {
  if (mainDiagonals[main].length < 3) {
    continue;
  }

  for (let c = 0; c < mainDiagonals[main].length - 2; c++) {
    var substring = mainDiagonals[main].substring(c, c + 3);
    if (substring == "MAS" || substring == "SAM") {
      diagonalWords += countXMAS(mainDiagonals, main, c, nRows);
    }
  }
}

console.log(diagonalWords);
