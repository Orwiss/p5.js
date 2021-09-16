let start, cv = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(30)
  noFill()
}

function draw() {
  background(12)
  
  start = createVector(mouseX, mouseY)
  
  if (mouseIsPressed) {
    for (let i = 0; i < 24; i++) {
      cv.push(new Crv(start, frameCount))
    }
  }
  
  for (let i = 0; i < cv.length; i++) {
    cv[i].update()
    cv[i].draw()
    if (frameCount >= cv[i].time) {
      if (cv[i].t > 0) cv[i].t -= 15
      else cv.splice(i, 1)
    }
  }
}

class Crv {
  constructor(start, frame) {
    this.t = 255
    this.start = start
    this.p = []
    this.length = 20
    this.theta = -90
    this.time = frame + 45
    this.angle = radians(random(360))
    this.c = color(random(255), random(255), random(255))
    this.r = random(1)
    this.w = random(1, 12)
    
    for (let i = 0; i < this.length; i++) {
      this.p[i] = this.start
    }
  }
  
  update() {
    let head = this.p[this.p.length - 1]
    let d = map(sin(radians(this.theta)), -1, 1, 0, min(width, height) / 60)
    
    for (let i = 0; i < this.p.length - 1; i++) {
      this.p[i] = this.p[i + 1]
    }
    
    head = createVector(head.x - cos(this.angle) * d, head.y - sin(this.angle) * d)
    this.p[this.p.length - 1] = head
    
    if (this.r < 0.5) {
      this.angle -= 0.045
    } else {
      this.angle += 0.045
    }
    
    this.theta += 6
  }
  
  draw() {
    stroke(this.c, this.t)
    strokeWeight(this.w)
    for (let i = 1; i < this.p.length; i++) {
      line(this.p[i - 1].x, this.p[i - 1].y, this.p[i].x, this.p[i].y)
    }
  }
}
