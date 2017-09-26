// Author : Robin Lefebvre
// Sources : Daniel Shiffman's implementation 
// https://youtu.be/BV9ny785UNc

// Other references
// http://www.karlsims.com/rd.html
// Also, for reference
// http://mrob.com/pub/comp/xmorphia/
//https://en.wikipedia.org/wiki/Reaction%E2%80%93diffusion_system

// GLOBAL VARIABLES DECLARATION
// Canvas object
var loadingAnimation;

// Array holding current data
var grid;
// Array holding future data
var next;

// Gray-Scott values to be inserted into the formula
var dA = 1;
var dB = 0.55;
var feed = 0.055;
var k = 0.062;

// Base size of the cells
var tileSize = 10;

// Interval that checks for frame rate
var interval;
// Floored frame rate value
var floorFrameRate;
var countGoodChecks = 0;

function setup() {
  // Calling function "checkFrameRate" every second.
  interval = setInterval(function() {
    checkFrameRate()
  }, 250);
  resetAnimation();
}

function windowResized() {
  resetAnimation();
}

function draw() {
  // Just keeping that one annoying pixel out of the way if inserting an image in front of animation
  background(0, 0, 0);

  // Calculating the data of each cell to be displayed
  for (var x = 1; x < (width / tileSize) - 1; x++) {
    for (var y = 1; y < (height / tileSize) - 1; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      next[x][y].a = a +
        (dA * laplaceA(x, y)) -
        (a * b * b) +
        (feed * (a));
      next[x][y].b = b +
        (dB * laplaceB(x, y)) +
        (a * b * b) -
        ((k + feed) * b);
      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  //If the frame rate is too low, we keep the loading phase on.
  if (countGoodChecks < 10) {
    simulate();
  }

  //If frame rate has been good enough for 10 seconds, then we are sure the animation will show correctly
  else {
    // Stopping frameRate checks
    clearInterval(interval);
    display();
  }
}

function simulate() {
  for (var x = 1; x < (width / tileSize); x++) {
    for (var y = 1; y < (height / tileSize); y++) {
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = (a - b) * 255;
      c = constrain(c, 0, 255);
      noStroke();
      fill(0);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  swap();
}

function display() {
  for (var x = 1; x < (width / tileSize) - 1; x++) {
    for (var y = 1; y < (height / tileSize) - 1; y++) {
      var a = next[x][y].a;
      var b = next[x][y].b;
      var c = (a - b) * 255;
      c = constrain(c, 0, 255);
      stroke(81, 81, 81);
      fill(255 - c);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
  swap();
}

function checkFrameRate() {
  floorFrameRate = floor(frameRate());
  if (floorFrameRate <= 20) {
    tileSize++;
    resetAnimation();
  } else {
    if (countGoodChecks <= 10) {
      countGoodChecks++;
      tileSize++;
      resetAnimation();
    }
  }
}

// Function handling the canvas position, and setting up the grid arrays accordingly
function resetAnimation() {
  loadingAnimation = createCanvas(windowWidth - 1, windowHeight - 1);
  loadingAnimation.position(0, 0);
  loadingAnimation.style('z-index', '-1');
  background(0, 0, 0);
  grid = [];
  next = [];
  for (var x = 0; x < width / tileSize; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height / tileSize; y++) {
      grid[x][y] = {
        a: 1,
        b: 0
      };
      next[x][y] = {
        a: 1,
        b: 0
      };
    }
  }
  for (var i = floor((width / tileSize) / 2) - 2; i < floor((width / tileSize) / 2) + 2; i++) {
    for (var j = floor((height / tileSize) / 2) - 2; j < floor((height / tileSize) / 2) + 2; j++) {
      grid[i][j].b = 1;
    }
  }
}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.055;
  sumA += grid[x + 1][y - 1].a * 0.055;
  sumA += grid[x + 1][y + 1].a * 0.055;
  sumA += grid[x - 1][y + 1].a * 0.055;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.035;
  sumB += grid[x + 1][y - 1].b * 0.035;
  sumB += grid[x + 1][y + 1].b * 0.035;
  sumB += grid[x - 1][y + 1].b * 0.035;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}