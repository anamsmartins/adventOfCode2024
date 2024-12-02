import { readInput } from "../../utils.js";

var input = readInput();

var reports = input.split("\n");
var safeReports = 0;
var numberLevelsPerReport;

reports.forEach((report) => {
  var levels = report.split(" ");
  numberLevelsPerReport = levels.length;

  var safe = true;
  var increasing = true;

  levels.forEach((level, index) => {
    if (index == numberLevelsPerReport - 1) {
      return;
    }

    var levelInt = parseInt(level);
    var nextLevelInt = parseInt(levels[index + 1]);

    if (index == 0 && levelInt > nextLevelInt) {
      increasing = false;
    }

    var difference = nextLevelInt - levelInt;

    if (increasing) {
      if (difference < 0) {
        safe = false;
        return;
      }

      if (difference < 1 || difference > 3) {
        safe = false;
        return;
      }
    } else {
      if (difference > 0) {
        safe = false;
        return;
      }

      if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
        safe = false;
        return;
      }
    }
  });

  if (safe) {
    safeReports++;
  }
});

console.log(safeReports);
