import { readInput, swapArrayElements } from "../../utils.js";

var input = readInput();

var separatedInput = input.split("\n\n");
var orderingRules = separatedInput[0].split("\n");
var updates = separatedInput[1].split("\n");

// 1. Detect Incorrectly Ordered Updates
var incorrectlyOrderedUpdates = [];
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

  if (!correctlyOrdered) {
    incorrectlyOrderedUpdates.push(update);
  }
});
console.log(incorrectlyOrderedUpdates);

// 2. Order the updates
var correctlyOrderedUpdates = [];
incorrectlyOrderedUpdates.forEach((update) => {
  var pages = update.split(",");
  var changedAnyElement = true;

  while (changedAnyElement) {
    changedAnyElement = false;
    orderingRules.forEach((rule) => {
      var separatedRule = rule.split("|");
      var beforePage = separatedRule[0];
      var nextPage = separatedRule[1];

      if (!pages.includes(beforePage) || !pages.includes(nextPage)) {
        return;
      }

      var beforeIndex = pages.indexOf(beforePage);
      var nextIndex = pages.indexOf(nextPage);
      if (beforeIndex > nextIndex) {
        swapArrayElements(pages, beforeIndex, nextIndex);
        changedAnyElement = true;
      }
    });
  }

  correctlyOrderedUpdates.push(pages.join(","));
});
console.log(correctlyOrderedUpdates);

// 3. Sum the middle element
var middlePageNumbers = 0;
correctlyOrderedUpdates.forEach((update) => {
  var pages = update.split(",");
  var middleElemnt = (pages.length - 1) / 2;
  middlePageNumbers += parseInt(pages[middleElemnt]);
});
console.log(middlePageNumbers);
