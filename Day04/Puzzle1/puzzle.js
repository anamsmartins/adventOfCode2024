import { readInput } from "../../utils.js";

var input = readInput();

var horizontalWords = 0; // & reversed
var verticalWords = 0; // & reversed
var diagonalWords = 0; // & reversed

// Get rows
var rows = input.split("\n");

var nRows = rows.length;
var nColumns = rows[0].length;

var columns = Array(nRows)
  .fill()
  .map(() => Array(nColumns).fill(0));

var inputMatrix = Array(nRows)
  .fill()
  .map(() => Array(nColumns).fill(0));

rows.forEach((row, index) => {
  var characters = row.split("");
  characters.forEach((char, char_index) => {
    // Get columns
    columns[char_index][index] = char;
    // Get input matrix
    inputMatrix[index][char_index] = char;
  });
});

columns.forEach((colum, index) => {
  columns[index] = colum.join("");
});

// Get diagonals
var nDiagonalsPerSide = nRows + nColumns - 1;
var diagonals = [];

// Get left-to-right (main) diagonals
for (let d = 0; d < nDiagonalsPerSide; d++) {
  const diagonal = [];
  for (let i = 0; i < nRows; i++) {
    const j = d - i; // Left to right
    if (j >= 0 && j < nColumns) {
      diagonal.push(inputMatrix[i][j]);
    }
  }
  diagonals.push(diagonal.join(""));
}

// Get right-to-left (anti) diagonals
for (let d = 0; d < nDiagonalsPerSide; d++) {
  const diagonal = [];
  for (let i = 0; i < nRows; i++) {
    const j = i - (d - nColumns + 1); // Right to left
    if (j >= 0 && j < nColumns) {
      diagonal.push(inputMatrix[i][j]);
    }
  }
  diagonals.push(diagonal.join(""));
}

function countXMAS(string) {
  var totalXMAS = 0;
  var occurences = string.match(/XMAS/g);
  if (occurences !== null) {
    totalXMAS += occurences.length;
  }

  var reversedOccurences = string.match(/SAMX/g);
  if (reversedOccurences !== null) {
    totalXMAS += reversedOccurences.length;
  }

  return totalXMAS;
}

// Horizontal words
rows.forEach((row) => {
  horizontalWords += countXMAS(row);
});
console.log(horizontalWords);

// Vertical Words
columns.forEach((column) => {
  verticalWords += countXMAS(column);
});
console.log(verticalWords);

// Diagonal Words
diagonals.forEach((diagonal) => {
  diagonalWords += countXMAS(diagonal);
});
console.log(diagonalWords);

var total = horizontalWords + verticalWords + diagonalWords;
console.log(total);
