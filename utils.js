import { readFileSync } from "fs";
const inputPath = "input.txt";

export function readInput() {
  return readFileSync(inputPath, "utf8");
}

export function occurInArray(array, value) {
  var total = 0;
  array.forEach((element) => {
    if (element == value) {
      total++;
    }
  });
  return total;
}

export function occurInMatrix(matrix, value) {
  var total = 0;
  matrix.forEach((array) => {
    total += occurInArray(array, value);
  });
  return total;
}

export function swapArrayElements(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

export function getInputMatrix(input, isNumeric = false) {
  var rows = input.split("\n");
  var nRows = rows.length;
  var nColumns = rows[0].length;

  var inputMatrix = Array(nRows)
    .fill()
    .map(() => Array(nColumns).fill(0));

  rows.forEach((row, index) => {
    var characters = row.split("");
    characters.forEach((char, char_index) => {
      // Get input matrix
      if (isNumeric) {
        char = parseInt(char);
      }
      inputMatrix[index][char_index] = char;
    });
  });

  return inputMatrix;
}

export function findPositionInMatrix(matrix, element) {
  var nRows = matrix.length;
  var nColumns = matrix[0].length;
  var position = null;

  for (var i = 0; i < nRows; i++) {
    for (var j = 0; j < nColumns; j++) {
      if (matrix[i][j] == element) {
        position = [i, j];
      }
    }
  }

  return position;
}

export function findAllPositionsInMatrix(matrix, element) {
  var nRows = matrix.length;
  var nColumns = matrix[0].length;
  var positions = [];

  for (var i = 0; i < nRows; i++) {
    for (var j = 0; j < nColumns; j++) {
      if (matrix[i][j] == element) {
        positions.push([i, j]);
      }
    }
  }

  return positions;
}

export function generateMatrix(rows, columns, fillElement = ".") {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill(fillElement));
}
