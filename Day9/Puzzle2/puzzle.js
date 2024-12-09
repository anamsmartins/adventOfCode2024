import { readInput, occurInArray } from "../../utils.js";

var input = readInput();
// console.log(input);

var fileBlocks = [];
var spaceBlocks = [];

// Initialize fileBlocks (even positions) and spaceBlocks (odd positions)
input.split("").forEach((element, index) => {
  if (index % 2 == 0) {
    fileBlocks.push(parseInt(element));
  } else {
    spaceBlocks.push(parseInt(element));
  }
});

console.log("File blocks: " + fileBlocks + "; Space blocks: " + spaceBlocks);

var diskmap = [];
var nValue = 0;

// Construct initial diskmap array
for (var i = 0; i < fileBlocks.length; i++) {
  var files = Array(fileBlocks[i]).fill(nValue);
  diskmap.push(...files);

  if (i < spaceBlocks.length) {
    var spaces = Array(spaceBlocks[i]).fill(".");
    diskmap.push(...spaces);
  }

  if (fileBlocks[i] != 0) {
    nValue++;
  }
}

console.log("Initial diskmap: " + diskmap);

function findLeftmostFreeSpaceIndex(diskmap, length) {
  var index = -1;
  for (var i = 0; i < diskmap.length; i++) {
    if (diskmap[i] == ".") {
      var possibleMatch = true;

      for (var p = 0; p < length; p++) {
        if (diskmap[i + p] !== ".") {
          console.log("Possible match for length " + length + " at i=" + i);
          possibleMatch = false;
          break;
        }
      }

      if (possibleMatch) {
        index = i;
        break;
      }
    }
  }
  return index;
}

for (var i = diskmap.length - 1; i >= 0; i--) {
  console.log("Wondering at " + i);
  var fileID = diskmap[i];

  if (fileID == ".") {
    continue;
  }

  // Find number of occurreces of the fileID
  var fileIDOccurrences = occurInArray(diskmap, fileID);
  console.log(
    "File ID: " + fileID + "; With " + fileIDOccurrences + " Occurences"
  );

  // Find available space position by length
  var leftmostFreeSpaceIndex = findLeftmostFreeSpaceIndex(
    diskmap,
    fileIDOccurrences
  );

  if (leftmostFreeSpaceIndex == -1 || leftmostFreeSpaceIndex > i) {
    continue;
  }

  // Swap spaces with the fileIDs
  var auxI = i;
  for (var p = 0; p < fileIDOccurrences; p++) {
    diskmap[leftmostFreeSpaceIndex + p] = fileID;
    diskmap[auxI] = ".";
    auxI--;
  }
}

console.log("Sorted diskmap: " + diskmap.join(""));

// Calculate cheksum
var checksum = 0;
for (i = 0; i < diskmap.length; i++) {
  if (diskmap[i] == ".") {
    continue;
  }
  checksum += i * diskmap[i];
}

console.log(checksum);
