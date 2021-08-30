let a, b, c

function setup() {
  createCanvas(windowWidth, windowHeight)

  a = createVector(width / 2, 200)
  b = createVector(200, height - 200)
  c = createVector(width - 200, height - 200)
}

function draw() {
  background(12)

  let r = createVector(mouseX, mouseY)
  let ar = degrees(atan2(r.y - a.y, r.x - a.x) + atan2(b.y - r.y, b.x - r.x) - PI / 2)
  let br = degrees(atan2(c.y - r.y, c.x - r.x) + (PI - atan2(b.y - r.y, b.x - r.x)))
  let cr = degrees(PI - atan2(r.y - a.y, r.x - a.x) + (PI / 2 - atan2(c.y - r.y, c.x - r.x)))

  if (360 - (ar + br + cr) < 1) {
    noFill()
    stroke(255)
    line(a.x, a.y, r.x, r.y)
    line(b.x, b.y, r.x, r.y)
    line(c.x, c.y, r.x, r.y)
  }
  else { 
    fill(180)
    noStroke()
  }

  triangle(a.x, a.y, b.x, b.y, c.x, c.y)
  textSize(64)
  fill(255)
  text(ar, width / 2, 600)
  text(br, width / 2, 700)
  text(cr, width / 2, 800)
  text(ar + br + cr, width / 2, 900)
}
