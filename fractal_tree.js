let len = 200;
let n = 12;
let startX, startY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  stroke(255);
  startX = width / 2;
  startY = height * 0.9;
}

function draw() {
  background(12);
  noLoop();
  tree(startX, startY,len, 0, n);
}

function tree(x, y, length, angle, level) {
  let dx = x - (length * sin(angle));
  let dy = y - (length * cos(angle));
  
  strokeWeight(12 / n * level);
  line(x, y, dx, dy);
  
  if (level > 1) {
  	tree(dx, dy, length * random(0.6, 0.8), angle + random(0, 60), level - 1);
  	tree(dx ,dy, length * random(0.6, 0.8), angle - random(0, 60), level - 1);
  }
}

function mouseReleased() {
  loop();
  noLoop();
}
