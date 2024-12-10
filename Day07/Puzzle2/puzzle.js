import { readInput } from "../../utils.js";

var input = readInput();

var equations = input.split("\n");

function generateCombinations(operators, length) {
  const combinations = [];

  // Recursive function
  function backtrack(current, depth) {
    // Base case - string reaches the required length
    if (depth === length) {
      combinations.push(current);
      return;
    }

    // Recursive step - Append each operator and recurse
    for (let op of operators) {
      backtrack(current + op, depth + 1);
    }
  }

  backtrack("", 0);
  return combinations;
}

var totalCalibration = 0;
var possibleOperators = ["+", "*", "||"];

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

  combinations.forEach((combination) => {
    if (matchedCombination) {
      return;
    }

    // Calculate total
    var total = numbers[0];
    var c = 0;
    for (var n = 0; n < nLength - 1; n++) {
      if (combination[c] == "|") {
        total = parseInt(total.toString() + numbers[n + 1].toString());
        c++;
      } else {
        total = eval(total + combination[c] + numbers[n + 1]);
      }
      c++;
    }

    if (total == testValue) {
      totalCalibration += testValue;
      matchedCombination = true;
    }
  });
});

console.log(totalCalibration);