import { readInput } from "../../utils.js";

var input = readInput();

var equations = input.split("\n");

function generateCombinations(operators, length) {
  const combinations = [];

  // Recursive function
  function backtrack(current) {
    // Base case - string reaches the required length
    if (current.length === length) {
      combinations.push(current);
      return;
    }

    // Recursive step - Append each operator and recurse
    for (let op of operators) {
      backtrack(current + op);
    }
  }

  backtrack("");
  return combinations;
}

var totalCalibration = 0;
var possibleOperators = ["+", "*"];

equations.forEach((equation) => {
  // Reset values
  var matchedCombination = false;

  // Get test value and numbers
  var separatedInput = equation.split(":");
  var testValue = parseInt(separatedInput[0]);
  var numbers = separatedInput[1].trim().split(" ");
  console.log("Test value: " + testValue + "; numbers: " + numbers);

  var nLength = numbers.length;

  // Find all possible combinations
  var combinations = generateCombinations(possibleOperators, nLength - 1);
  console.log("Combinations: " + combinations + "; nLength: " + nLength);

  combinations.forEach((combination) => {
    if (matchedCombination) {
      return;
    }

    // Calculate total
    var total = numbers[0];
    for (var n = 0; n < nLength - 1; n++) {
      total = eval(total + combination[n] + numbers[n + 1]);
    }

    if (total == testValue) {
      totalCalibration += testValue;
      matchedCombination = true;
    }
  });
});

console.log(totalCalibration);
