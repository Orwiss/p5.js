let fur = [], num = 128

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(30)
  stroke(255)
  
  for (let i = 0; i < num; i++) {
    fur.push(new Fur(createVector(random(width), random(height))))
  }
  
  /*for (let i = 0; i < num; i++) {
    let dist = min(width, height) / 3
    fur.push(new Fur(createVector(width / 2 + cos(radians(360 / num * i)) * dist, height / 2 + sin(radians(360 / num * i)) * dist), 360 / num * i))
  }*/
}

function draw() {
  background(12);
  let mouse = createVector(mouseX, mouseY)
  
  for (let i = 0; i < fur.length; i++) {
    for (let j = 0; j < fur[i].pos.length; j++) {
      if (dist(mouse.x, mouse.y, fur[i].pos[j].x, fur[i].pos[j].y) < 120) {
        let dx = Math.ceil(abs(mouseX - fur[i].pos[0].x))
        let dy = Math.ceil(abs(mouseY - fur[i].pos[0].y))
        fur[i].setForce((mouseX - pmouseX) * dx, (mouseY - pmouseY) * dy)
      } else {
        fur[i].setForce(fur[i].pos[i], height * 2)
      }
    }
    
    fur[i].update()
    fur[i].draw()
  }
}

class Fur {
  constructor(root, angle) {
    this.seg = 48
    this.pos = [root]
    this.force = createVector(0, 0)
    
    for (let i = 0; i < this.seg - 1; i++) {
      let x = root.x + cos(radians(angle)) * 3 * i
      let y = root.y + sin(radians(angle)) * 3 * i
      this.pos.push(createVector(x, y))
    }
  }
  
  update() {
    for (let i = 1; i < this.pos.length; i++) {
      let force = p5.Vector.mult(this.force, pow(map(i, 1, this.pos.length, 0, 1), 2))
      this.pos[i].add(force)
      
      let tmp = p5.Vector.sub(this.pos[i], this.pos[i - 1]).normalize().mult(3)
      this.pos[i] = p5.Vector.add(this.pos[i - 1], tmp)
    }
  }
  
  setForce(vx, vy) {
    let input = p5.Vector.sub(createVector(vx, vy), this.force).mult(0.05)
    this.force.add(input)
  }
  
  draw() {
    for (let i = 1; i < this.pos.length; i++) {
      strokeWeight(map(i, 1, this.pos.length - 1, this.pos.length / 4, 1))
      line(this.pos[i - 1].x, this.pos[i - 1].y, this.pos[i].x, this.pos[i].y)
    }
  }
}
