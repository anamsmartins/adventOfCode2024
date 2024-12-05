import { readInput } from "../../utils.js";

var input = readInput();

var separatedInput = input.split("\n\n");
var orderingRules = separatedInput[0].split("\n");
var updates = separatedInput[1].split("\n");

// 1. Detect Correctly Ordered Updates
var correctlyOrderedUpdates = [];
var correctlyOrdered = true;
updates.forEach((update) => {
  var pages = update.split(",");
  console.log(pages);
  correctlyOrdered = true;

  orderingRules.forEach((rule) => {
    var separatedRule = rule.split("|");
    var beforePage = separatedRule[0];
    var nextPage = separatedRule[1];

    if (!pages.includes(beforePage) || !pages.includes(nextPage)) {
      return;
    }

    if (pages.indexOf(beforePage) > pages.indexOf(nextPage)) {
      correctlyOrdered = false;
    }
  });

  if (correctlyOrdered) {
    correctlyOrderedUpdates.push(update);
  }
});
console.log(correctlyOrderedUpdates);

// 2. Sum the middle element
var middlePageNumbers = 0;
correctlyOrderedUpdates.forEach((update) => {
  var pages = update.split(",");
  var middleElemnt = (pages.length - 1) / 2;
  middlePageNumbers += parseInt(pages[middleElemnt]);
});
console.log(middlePageNumbers);
