import {
  readInput,
  getInputMatrix,
  findPositionInMatrix,
  findAllPositionsInMatrix,
} from "../../utils.js";

var input = readInput();

var inputMatrix = getInputMatrix(input);

var intialPosition = findPositionInMatrix(inputMatrix, "^");
if (intialPosition == null) {
  console.log("Position not found");
}

// Current position
var currentPosition = [intialPosition[0], intialPosition[1]];

var obstacles = findAllPositionsInMatrix(inputMatrix, "#");
if (obstacles.length == 0) {
  console.log("No obstucle found");
}

var nRows = inputMatrix.length;
var nColumns = inputMatrix[0].length;
var currentDirection = 0;

function reachedBorder(position) {
  var x = position[0];
  var y = position[1];
  // console.log("POSITION : " + position);
  if (x == 0 || x == nRows - 1 || y == 0 || y == nColumns - 1) {
    return true;
  }

  return false;
}

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
      // console.log("OH NO, reached obstacle!");
    }
  });

  return reachedObstacle;
}

function move(position, direction, obstacles) {
  while (
    !(
      reachedObstacle(position, direction, obstacles) || reachedBorder(position)
    )
  ) {
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
      default: //left
        position[1] -= 1;
        break;
    }
  }
}

function collidedWithO(position, direction, newObstaclePosition) {
  var nextPosition = [position[0], position[1]];
  switch (direction) {
    case 0: // up
      nextPosition[0] -= 1;
      break;
    case 1: //right
      nextPosition[1] += 1;
      break;
    case 2: // down
      nextPosition[0] += 1;
      break;
    default: //left
      nextPosition[1] -= 1;
      break;
  }
  if (
    nextPosition[0] == newObstaclePosition[0] &&
    nextPosition[1] == newObstaclePosition[1]
  ) {
    return true;
  }

  return false;
}

// Exclusion factors
var loopPossibilites = 0;
var guardLeft = false;
var maxColisions = 1000;

var newObstaclePosition = [-1, -1];
var nCollidedWithO = 0;
var nIterations = 0;

for (var i = 0; i < nRows; i++) {
  for (var j = 0; j < nColumns; j++) {
    console.log("=== NEW ITERATION ===");
    if (inputMatrix[i][j] == "#" || inputMatrix[i][j] == "^") {
      continue;
    }

    // Reset new obstacle variables
    newObstaclePosition = [i, j];
    inputMatrix[i][j] = "O";
    obstacles.push([i, j]);
    nCollidedWithO = 0;
    nIterations = 0;

    console.log("New obstacle position: " + newObstaclePosition);
    currentPosition[0] = intialPosition[0];
    currentPosition[1] = intialPosition[1];
    currentDirection = 0;

    console.log("Current Position: " + currentPosition);
    guardLeft = false;

    while (
      !(
        guardLeft ||
        nCollidedWithO > maxColisions ||
        nIterations > maxColisions
      )
    ) {
      // Once obstacle had influence in the path
      if (nCollidedWithO > 0) {
        nIterations++;
      }

      if (nIterations > maxColisions) {
        loopPossibilites++;
        continue;
      }

      move(currentPosition, currentDirection, obstacles);

      if (
        collidedWithO(currentPosition, currentDirection, newObstaclePosition)
      ) {
        nCollidedWithO++;
      }

      if (nCollidedWithO > maxColisions) {
        loopPossibilites++;
        continue;
      }

      if (reachedObstacle(currentPosition, currentDirection, obstacles)) {
        // Turn right
        if (currentDirection == 3) {
          currentDirection = 0;
        } else {
          currentDirection++;
        }
      }

      if (reachedBorder(currentPosition)) {
        console.log("I REACHED BORDER");
        guardLeft = true;
      }
    }

    console.log("LEFT WHILE");

    inputMatrix[i][j] = ".";
    obstacles.pop();
  }
}

console.log(loopPossibilites);
