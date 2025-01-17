const sequenceTypes = {
  211: ["imgBigLeft", "imgSmallRightUp", "imgSmallRightDown"],
  112: ["imgSmallLeftUp", "imgSmallLeftDown", "imgBigRight"],
  11: ["imgSquare", "imgSquare"],
};

export const mozaicSequences = [
  {
    slice: [0, 3],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["211"],
  },
  {
    slice: [3, 6],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["112"],
  },
  {
    slice: [6, 8],
    gridType: "gridMozaic11",
    sequence: sequenceTypes["11"],
  },
  {
    slice: [8, 11],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["112"],
  },
  {
    slice: [11, 13],
    gridType: "gridMozaic11",
    sequence: sequenceTypes["11"],
  },
  {
    slice: [13, 16],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["211"],
  },
  {
    slice: [0, 3],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["211"],
  },
  {
    slice: [3, 6],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["112"],
  },
  {
    slice: [6, 8],
    gridType: "gridMozaic11",
    sequence: sequenceTypes["11"],
  },
  {
    slice: [8, 11],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["112"],
  },
  {
    slice: [11, 13],
    gridType: "gridMozaic11",
    sequence: sequenceTypes["11"],
  },
  {
    slice: [13, 16],
    gridType: "gridMozaic111",
    sequence: sequenceTypes["211"],
  },
];
