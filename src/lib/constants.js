export const TOKENS = {
  X: "x",
  O: "o"
}

export const COLORS = {
  None: { name: "None", value: "" },
  Red: { name: "Red", value: "rgb(255,0,0)" },
  Yellow: { name: "Yellow", value: "rgb(255,255,0)" },
  Green: { name: "Green", value: "rgb(0,255,0)" },
  Cyan: { name: "Cyan", value: "rgb(0,255,255)" },
  Blue: { name: "Blue", value: "rgb(0,0,255)" },
  Magenta: { name: "Magenta", value: "rgb(255,0,255)" },
}

export const AILEVEL = {
  easy: { name: "Dummy", value: 0, },
  normal: { name: "Smart", value: 1, },
  hard: { name: "Genius", value: 2 }
}

export const GRIDSIZE = {
  three: { name: "3x3", value: 3, },
  four: { name: "4x4", value: 4, },
  five: { name: "5x5", value: 5, }
}

export const LINES = {
  // 3x3
  3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  // 4x4
  4: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ],
  // 5x5
  5: [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ]
}