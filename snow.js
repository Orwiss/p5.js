let snow = [];
let cycle = 0.1 * 30;	//second * framerate

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  noStroke();
}

function draw() {
  background(12);

  if (frameCount % cycle == 0) {snow.push(new Snow());}

  for (let i = 0; i < snow.length; i++) {
    snow[i].update();
    snow[i].draw();
  }

  for (let i = snow.length - 1; i >= 0; i--) {
    if(snow[i].life <= 0) {
      snow.splice(i, 1);
    }
  }
}

class Snow {
  constructor() {
    this.life = 6 * 30;
    this.speed = 8;
    this.transp = 255;
    this.x = random(width);
    this.y = 0;
    this.d = random(12, 36);
  }

  draw() {
    fill(255, this.transp);
    circle(this.x, this.y, this.d);
  }

  update() {
    this.y += this.speed;
    this.life--;
    this.speed /= 1.008;
    this.transp -= 1.5;
  }
}
