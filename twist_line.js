let r = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(30)
  
  r.push(new Rope())
}

function draw() {
  background(255, 255, 245)
  
  for (let i = 0; i < r.length; i++) {
    r[i].update()
    r[i].draw()
  }
}

function mouseReleased() {
  if (mouseButton == LEFT) r.push(new Rope())
  else saveFrames('project5', 'png', 1, 30)
}

class Rope {
  constructor() {
    this.start = createVector(0, 0)
    this.p = [this.start]
    this.n = random(100000)
    this.c = color(random(128, 255), 24, random(84, 192))
    this.w = random(0.2, 4)
  }
  
  update() {
    noiseDetail(32, 0.01)
    
    let p = this.p[this.p.length - 1]
    let n = map(noise(this.n), 0, 1, -45, 675)
    let l = 4
    
    if (p.x < width || p.y < height) {
      this.p.push(createVector(p.x + cos(radians(n)) * l, p.y + sin(radians(n)) * l))
    }
    
    if (n > 90) this.n += .7
    else this.n += .2
  }
  
  draw() {
    stroke(this.c)
    strokeWeight(this.w)
    for (let i = 0; i < this.p.length - 1; i++) {
      line(this.p[i].x, this.p[i].y, this.p[i + 1].x, this.p[i + 1].y)
    }
  }
}
