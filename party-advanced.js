let p = [];
let particleNum = 64;
let traceNum = 12;
let startWidth, endWidth, startHeight, endHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  noStroke();
	
  //class in array
  for (let i = 0; i < particleNum; i++) {
    p.push(new particleSystem());
  }
}

function draw() {
  background(32);
  
  //movement range interaction
  if (mouseX < width / 2) {
  	startWidth = mouseX;
  	endWidth = width - mouseX;
  }
  else {
  	startWidth = width - mouseX;
  	endWidth = mouseX;
  }
  if (mouseY < height / 2) {
  	startHeight = mouseY;
  	endHeight = height - mouseY;
  }
  else {
  	startHeight = height - mouseY;
  	endHeight = mouseY;
  }
  
  //fill(32);
  //rect(startWidth, startHeight, endWidth - startWidth, endHeight - startHeight);
  
  //reset interaction
  if (mouseIsPressed) {
  	for (let i = 0; i < p.length; i++) {
  		p[i].redraw();
  	}
  }
  
  //display system
  for (let i = 0; i < p.length; i++) {
    p[i].draw();
    p[i].update();
  }
}

class particleSystem {
  constructor() {
    this.x = [];
    this.y = [];
    this.d = random(12, 24);
    this.tX = random(10000);
    this.tY = random(10000);
    this.sp = 16;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);


    //default setting
    for (let i = 0; i < traceNum; i++) {
      this.x[i] = width / 2;
      this.y[i] = height / 2;
    }
  }
	
  draw() {
    //create circle
    for (let i = 0; i < traceNum; i++) {
      fill(this.r, this.g, this.b, 255 - i * (255 / traceNum));
      circle(this.x[i], this.y[i], this.d);
    }

    //plus seed
    this.tX += 0.05;
    this.tY += 0.05;
  }
	
  update() {
    //trace queue
    for (let i = traceNum - 1; i >= 0; i--) {
      this.x[i + 1] = this.x[i];
      this.y[i + 1] = this.y[i];
    }

    //x move
    if (this.x[0] < startWidth) {
      this.x[0] = endWidth;
    }
    else if (this.x[0] > endWidth) {
      this.x[0] = startWidth;
    }
    else {
      this.x[0] += map(noise(this.tX), 0, 1, -this.sp, this.sp);
    }

    //y move
    if (this.y[0] < startHeight) {
      this.y[0] = endHeight;
    }
    else if (this.y[0] > endHeight) {
      this.y[0] = startHeight;
    }
    else {
      this.y[0] += map(noise(this.tY), 0, 1, -this.sp, this.sp);
    }
  }
  
  redraw() {
  	for (let i = 0; i < traceNum; i++) {
      this.x[i] = width / 2;
      this.y[i] = height / 2;
    }
    
    this.d = random(12, 24);
    this.tX = random(10000);
    this.tY = random(10000);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
}
