// most of this is from https://p5js.org/examples/simulate-game-of-life.html

let columns;
let rows;
let board;
let next;

const cellSize = 15;
const gutterSize = 1;
const colourBackground = '#000';
const colourStroke = '#000';
const decay = 0.02;
const colourAlive = '#f41';
const colourDead = '#ccc';

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  // Calculate columns and rows
  columns = floor(width / cellSize);
  rows = floor(height / cellSize);
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
  background(colourBackground);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      // if a cell is alive, colour it alive
      // otherwise, fade the dead colour into the background depending on the cell's age
      if ((board[i][j] == 1)) {
        fill(colourAlive);
      } else {
        fill(lerpColor(color(colourBackground), color(colourDead), board[i][j]));
      }
      stroke(colourStroke);
      rect(i * cellSize, j * cellSize, cellSize - gutterSize, cellSize - gutterSize);
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
      // instead of dying (0) right away, apply a decay for each cycle a cell isn't alive
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = board[x][y] - decay;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = board[x][y] - decay;           // Overpopulation
      else if ((board[x][y] < 1 ) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else {
        if (board[x][y] == 1) {
          next[x][y] = 1;
        } else {
          next[x][y] = board[x][y] - decay
        }
      }
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}