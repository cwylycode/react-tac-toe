export const TOKENS = {
  X: {
    name: "X",
    value: "x"
  },
  O: {
    name: "O",
    value: "o"
  }
}

export const TOGGLE = {
  On: {
    name: "On",
    value: "true"
  },
  Off: {
    name: "Off",
    value: "false"
  }
}

export const COLORS = {
  // CSS class definitions to be used for the tokens
  // https://codepen.io/sosuke/pen/Pjoqqp
  None: {
    name: "None",
    value: ""
  },
  Red: {
    name: "Red",
    value: "color-red"
  },
  Yellow: {
    name: "Yellow",
    value: "color-yellow"
  },
  Green: {
    name: "Green",
    value: "color-green"
  },
  Cyan: {
    name: "Cyan",
    value: "color-cyan"
  },
  Blue: {
    name: "Blue",
    value: "color-blue"
  },
  Magenta: {
    name: "Magenta",
    value: "color-magenta"
  },
}

export const AILEVELS = {
  easy: {
    name: "Dumb",
    value: 0,
  },
  normal: {
    name: "Smart",
    value: 1,
  },
  hard: {
    name: "Genius",
    value: 2
  }
}

export const GRIDSIZES = {
  three: {
    name: "3 x 3",
    value: 3,
  },
  four: {
    name: "4 x 4",
    value: 4,
  },
  five: {
    name: "5 x 5",
    value: 5,
  }
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