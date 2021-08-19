let font, txt;
let size = 600;
let c;
let p = [];
 
function preload() {
  font = loadFont("includes/demos-data/fonts/RobotoMono-Regular.otf"); // load font
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  textFont(font);
  textSize(size);
  fill(255);
  noStroke();
  txt = char(random(65, 90)); // decide alphabet
  c = font.textToPoints(txt, (width / 2) - (textWidth(txt) / 2), (height / 2) + (textWidth(txt) / 2), size, {
    sampleFactor: .55 // density of particles
  }); // set points
  
  for (let i = 0; i < c.length; i++) {
    p.push(new Particle(c[i].x, c[i].y)); // push coordinate of every points into class
  }
} 
 
function draw() {
  background(12);

  if (mouseIsPressed) {
    for (let i = 0; i < p.length; i++) {
      if (p[i].sh <= 480) {
        p[i].sh += 3; // spread
      }
    }
  } else {
    for (let i = 0; i < p.length; i++) {
      if (p[i].sh > 30) {
        p[i].sh -= 3; // reset
      }
    }
  }

  for (let i = 0; i < p.length; i++) {
    p[i].update();
    p[i].draw();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = random(2, 10);
    this.rx = random(10000);
    this.ry = random(10000);
    this.sh = 480; // noise range
    this.sp = 30; // moving speed
  }
  
  update() {
    this.nx = map(noise(this.rx), 0, 1, -this.sh, this.sh);
    this.ny = map(noise(this.ry), 0, 1, -this.sh, this.sh);
    this.rx += this.sp / 1000;
    this.ry += this.sp / 1000;
  }
  
  draw() {
    circle(this.x + this.nx, this.y + this.ny, this.d);
  }
}
