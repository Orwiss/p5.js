let a, b, c, d, first
let p = []
let mouse

function setup() {
  createCanvas(800, 800);
  frameRate(30)
  
  a = createVector(width * 0.1, height * 0.1)
  b = createVector(width * 0.9, height * 0.1)
  c = createVector(width * 0.9, height * 0.9)
  d = createVector(width * 0.1, height * 0.9)
  
  first = [a, b, c, d]
  p.push(new Polygon(first))
}

function draw() {
  background(0);
  
  for (let i = 0; i < p.length; i++) {
    p[i].draw()
    
    if (mouseInPolygon(p[i].points)) {
      fill(180, 72)
      stroke(255)
      strokeWeight(2)
      for (let j = 0; j < p[i].points.length; j++) {
        line(p[i].points[j].x, p[i].points[j].y, mouseX, mouseY)
      }
      
      if (mouse) {
        let rand = getRandom(p[i].points.length + 1)
        for (let j = 0; j < p[i].points.length; j++) {
          for (let k = 0; k < p[i].split(rand).length; k++) {
            let m = p[i].split(rand)[j][k]
            let n = p[i].split(rand)[j][k + 1]
            let z = [m, n, createVector(mouseX, mouseY)]
            
            p.push(new Polygon(z))
          }
        }
        p.splice(i, 1)
        mouse = false
      }
    }
  }
}

function mouseInPolygon(polygon) {
  let cross = 0

  for (let i = 0; i < polygon.length; i++) {
    let m, n
    m = polygon[i]
    n = (i == polygon.length - 1) ? polygon[0]:polygon [i + 1]

    if ((m.y > mouseY) != (n.y > mouseY)) {
      let x = (((n.x - m.x) / (n.y - m.y) * (mouseY - m.y))) + m.x
      if (mouseX < x) {
        cross ++
      }
    }
  }

  return (cross % 2 == 1) ? true:false
}

function getRandom(num) {
  let r = [0, 1]
  for (let i = 0; i < num - 2; i++) {
    r.push(random(1))
  }
  r.sort()
  return r
}

function mouseReleased() {
  if (mouseButton == LEFT) mouse = true
  else saveCanvas('img', 'png')
}

class Polygon {
  constructor(points) {
    this.points = points
    this.t = random(12, 48)
  }
  
  draw() {
    if (mouseInPolygon(this.points)) fill(180, 72)
    else fill(180, this.t)
    stroke(64)
    strokeWeight(0.5)
    
    beginShape()
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y)
    }
    endShape(CLOSE)
  }
  
  split(r) {
    let splitPoint = []
    
    for (let i = 0; i < this.points.length; i++) {
      let m, n
      m = this.points[i]
      n = (i == this.points.length - 1) ? this.points[0]:this.points[i + 1]

      let p = []
      for (let j = 0; j < this.points.length + 1; j++) {
        let q = createVector(lerp(m.x, n.x, r[j]), lerp(m.y, n.y, r[j]))
        p.push(q)
      }
      splitPoint.push(p)
    }
    return splitPoint
  }
}
