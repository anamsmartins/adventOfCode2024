import { readInput } from "../../utils.js";

var input = readInput();

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

console.log("Initial diskmap: " + diskmap.join(""));

function findLeftmostFreeSpaceIndex(diskmap) {
  var index = -1;
  for (var i = 0; i < diskmap.length; i++) {
    if (diskmap[i] == ".") {
      index = i;
      break;
    }
  }
  return index;
}

var noGaps = false;

while (!noGaps) {
  for (var i = diskmap.length - 1; i >= 0; i--) {
    var fileID = diskmap[i];
    if (fileID == ".") {
      continue;
    }

    // Find available space position
    var leftmostFreeSpaceIndex = findLeftmostFreeSpaceIndex(diskmap);
    if (leftmostFreeSpaceIndex > i) {
      noGaps = true;
      break;
    }

    // Swap space with the fileID
    diskmap[leftmostFreeSpaceIndex] = fileID;
    diskmap[i] = ".";
  }
}

console.log("Sorted diskmap: " + diskmap.join(""));

// Calculate cheksum
var checksum = 0;
for (i = 0; i < diskmap.length; i++) {
  if (diskmap[i] == ".") {
    break;
  }
  checksum += i * diskmap[i];
}

console.log(checksum);
