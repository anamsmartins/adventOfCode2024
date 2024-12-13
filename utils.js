import { readFileSync } from "fs";

// === Input function ===
const inputPath = "input.txt";
export function readInput() {
  return readFileSync(inputPath, "utf8");
}

// === Array functions ===
export function occurInArray(array, value) {
  var total = 0;
  array.forEach((element) => {
    if (element == value) {
      total++;
    }
  });
  return total;
}

export function swapArrayElements(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// === Matrix functions ===
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
      if (isNumeric) {
        char = parseInt(char);
      }
      inputMatrix[index][char_index] = char;
    });
  });

  return inputMatrix;
}

export function generateMatrix(rows, columns, fillElement = ".") {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill(fillElement));
}

export function occurInMatrix(matrix, value) {
  var total = 0;
  matrix.forEach((array) => {
    total += occurInArray(array, value);
  });
  return total;
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

export function getElementsPositionsMapFromMatrix(
  matrix,
  excludedElements = []
) {
  var elementPositions = new Map();

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      var element = matrix[i][j];

      if (excludedElements.includes(element)) {
        continue;
      }

      if (elementPositions.has(element)) {
        elementPositions.get(element).push([i, j]);
      } else {
        elementPositions.set(element, [[i, j]]);
      }
    }
  }

  return elementPositions;
}

export function reachedMatrixBorder(position, nRows, nColumns) {
  var x = position[0];
  var y = position[1];
  if (x == 0 || x == nRows - 1 || y == 0 || y == nColumns - 1) {
    return true;
  }

  return false;
}

export function moveDirectionInMatrix(position, direction) {
  if (typeof direction == "number") {
    switch (direction) {
      case 0: // up
        position[0] -= 1;
        break;
      case 1: //right
        position[1] += 1;
        break;
      case 2: // down
        position[0] += 1;
        break;
      case 3: //left
        position[1] -= 1;
        break;
    }
  } else {
    switch (toLowerCase(direction)) {
      case "up":
        position[0] -= 1;
        break;
      case "right":
        position[1] += 1;
        break;
      case "down":
        position[0] += 1;
        break;
      case "left":
        position[1] -= 1;
        break;
    }
  }
}

export function isPossibleDirectionInMatrix(position, direction, matrix) {
  var x = position[0];
  var y = position[1];

  var nRows = matrix.length;
  var nColumns = matrix[0].length;

  // Check if next position is out of bounds according to the direction
  switch (direction) {
    case "left":
      return x - 1 > -1;
    case "right":
      return x + 1 < nRows;
    case "up":
      return y - 1 > -1;
    case "down":
      return y + 1 < nColumns;
  }
}

// Miscelaneous functions
export function generateCombinations(elements, length) {
  const combinations = [];

  // Recursive function
  function backtrack(current, depth) {
    // Base case - string reaches the required length
    if (depth === length) {
      combinations.push(current);
      return;
    }

    // Recursive step - Append each element and recurse
    for (let el of elements) {
      backtrack(current + el, depth + 1);
    }
  }

  backtrack("", 0);
  return combinations;
}
