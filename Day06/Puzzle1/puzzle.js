import {
  readInput,
  occurInArray,
  getInputMatrix,
  reachedMatrixBorder,
  findPositionInMatrix,
  findAllPositionsInMatrix,
  moveDirectionInMatrix,
} from "../../utils.js";

var input = readInput();

var inputMatrix = getInputMatrix(input);

var currentPosition = findPositionInMatrix(inputMatrix, "^");
if (currentPosition == null) {
  console.log("Position not found");
}

var obstacles = findAllPositionsInMatrix(inputMatrix, "#");
if (obstacles.length == 0) {
  console.log("No obstucle found");
}

var currentDirection = 0;

var positionsVisited = 1;
var guardLeft = false;

function reachedObstacle(position, direction, obstacles) {
  var x = position[0];
  var y = position[1];
  var reachedObstacle = false;
  var nextX = x;
  var nextY = y;

  switch (direction) {
    case 0: // up
      nextX -= 1;
      break;
    case 1: //right
      nextY += 1;
      break;
    case 2: // down
      nextX += 1;
      break;
    default: //left
      nextY -= 1;
      break;
  }

  obstacles.forEach((obstacle) => {
    if (nextX == obstacle[0] && nextY == obstacle[1]) {
      reachedObstacle = true;
      console.log("OH NO, reached obstacle!");
    }
  });

  return reachedObstacle;
}

function move(position, direction, obstacles, matrix) {
  console.log("Position: " + position + "; Direction: " + direction);
  while (
    !(
      reachedObstacle(position, direction, obstacles) ||
      reachedMatrixBorder(position, matrix.length, matrix[0].length)
    )
  ) {
    matrix[position[0]][position[1]] = "X";
    moveDirectionInMatrix(position, direction);
  }
}

while (!guardLeft) {
  move(currentPosition, currentDirection, obstacles, inputMatrix);
  if (reachedObstacle(currentPosition, currentDirection, obstacles)) {
    // Turn right
    if (currentDirection == 3) {
      currentDirection = 0;
    } else {
      currentDirection++;
    }
  }

  if (
    reachedMatrixBorder(
      currentPosition,
      inputMatrix.length,
      inputMatrix[0].length
    )
  ) {
    guardLeft = true;
  }
}

inputMatrix.forEach((line) => {
  positionsVisited += occurInArray(line, "X");
});

console.log(inputMatrix);
console.log(positionsVisited);
