let w;
let columns;
let rows;
let board;
let next;

let decay = 0.05;

function setup() {
  frameRate(20);
  createCanvas(1000, 500);
  w = 20;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(0);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) {
        fill(255, 100, 0);
      }
      else fill(255 * board[i][j]);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = floor(random(2)) * 1.0;
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (board[x+i][y+j] == 1) {
            neighbors += 1;
          }
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      if (board[x][y] == 1) {
        neighbors -= 1;
      }
      // Rules of Life
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = board[x][y] - decay;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = board[x][y] - decay;           // Overpopulation
      else if ((board[x][y] < 1 ) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else {
        if (board[x][y] == 1) {
          next[x][y] = 1;
        } else {
          next[x][y] = board[x][y] -= decay
        }
      }
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}