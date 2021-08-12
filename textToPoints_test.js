let font;
let txt = 'Test'
let size = 320;
let points;

function preload() {
  font = loadFont("includes/demos-data/fonts/RobotoMono-Regular.otf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(size);
  fill(255);
  noStroke();
  points = font.textToPoints(txt, width / 2 * 0.2, height / 2, size);
}

function draw() {
  background(12);

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let sx = map(sin(radians(i * 40 + frameCount * 36)), -1, 1, -15, 15);
    circle(p.x + sx, p.y, random(2, 8));
  }
}
