let font;
let txt = 'Test';
let size = 320;
let points;

function preload() {
  font = loadFont("includes/demos-data/fonts/RobotoMono-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(size);
  stroke(255);
  points = font.textToPoints(txt, width / 2 * 0.2, height / 2, size);
}

function draw() {
  background(12);

  for (let i = 1; i < points.length; i++) {
    let p = points[i - 1];
    let c = points[i];
    let w = map(sin(radians(i * 8 + frameCount * 8)), -1, 1, 0.5, 24);
    strokeWeight(w);
    if (dist(p.x, p.y, c.x, c.y) < 120) {
      line(p.x, p.y, c.x, c.y);
    }
  }
}
