import {
  readInput,
  getInputMatrix,
  findAllPositionsInMatrix,
  isPossibleDirectionInMatrix,
} from "../../utils.js";

var input = readInput();

var topographicMap = getInputMatrix(input, true);
var trailheads = findAllPositionsInMatrix(topographicMap, 0);

// Initialize trailheadScores map
var trailheadScores = new Map();
trailheads.forEach((trailhead) => {
  trailheadScores.set(trailhead, []);
});

var possibleDirections = ["left", "right", "up", "down"];

function moveDirection(position, direction) {
  var x = position[0];
  var y = position[1];

  // Move accordingly to the direction
  switch (direction) {
    case "left":
      return [x - 1, y];
    case "right":
      return [x + 1, y];
    case "up":
      return [x, y - 1];
    case "down":
      return [x, y + 1];
  }
}

function moveRecursively(
  trailhead,
  currentPosition,
  currentValue,
  direction,
  trailheadScores,
  topographicMap
) {
  if (
    !isPossibleDirectionInMatrix(currentPosition, direction, topographicMap)
  ) {
    return;
  }

  var newPosition = moveDirection(currentPosition, direction);

  var newValue = topographicMap[newPosition[0]][newPosition[1]];

  if (newValue != currentValue + 1) {
    return;
  }

  if (
    newValue == 9 &&
    !trailheadScores
      .get(trailhead)
      .some((arr) =>
        arr.every((position, index) => position === newPosition[index])
      )
  ) {
    trailheadScores.get(trailhead).push(newPosition);
    return;
  }

  for (let direction of possibleDirections) {
    moveRecursively(
      trailhead,
      newPosition,
      newValue,
      direction,
      trailheadScores,
      topographicMap
    );
  }
}

trailheads.forEach((trailhead) => {
  for (let direction of possibleDirections) {
    moveRecursively(
      trailhead,
      trailhead,
      0,
      direction,
      trailheadScores,
      topographicMap
    );
  }
});

console.log(trailheadScores);

var score = 0;
for (let finishPositions of trailheadScores.values()) {
  score += finishPositions.length;
}

console.log(score);
