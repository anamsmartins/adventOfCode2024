import { readInput } from "../../utils.js";

var input = readInput();

var reports = input.split("\n");

function isSafe(difference, increasing) {
  if (increasing) {
    if (difference < 0 || difference < 1 || difference > 3) {
      return false;
    }
  } else {
    if (
      difference > 0 ||
      Math.abs(difference) < 1 ||
      Math.abs(difference) > 3
    ) {
      return false;
    }
  }

  return true;
}

function isReportSafe(levels) {
  var increasing = parseInt(levels[1]) > parseInt(levels[0]);
  var safeLevels = levels.map((level, index) => {
    var difference = parseInt(levels[index + 1]) - parseInt(level);
    return isSafe(difference, increasing);
  });
  return !safeLevels.includes(false);
}

var safeReportsPart1 = reports.filter((report) => {
  var levels = report.split(" ");
  return isReportSafe(levels);
});

console.log("Part 1: " + safeReportsPart1.length);

var excludedReports = reports.filter((report) => {
  return !safeReportsPart1.includes(report);
});

var safeReportsPart2 = excludedReports.filter((report) => {
  var levels = report.split(" ");
  var anySafe = false;
  var numberOfLevels = levels.length;

  for (var i = 0; i < numberOfLevels; i++) {
    var tempLevels = [...levels];
    tempLevels.splice(i, 1);
    if (isReportSafe(tempLevels)) {
      anySafe = true;
      break;
    }
  }

  return anySafe;
});

var total = safeReportsPart1.length + safeReportsPart2.length;
console.log("Part 2: " + total);
