r = [] 
 
def setup():
    size(600, 800)
    frameRate(30)
    
    r.append(Rope()) 
 
def draw():
    background(255, 255, 245)
    
    for i in range(len(r)):
        r[i].update()
        r[i].display()
 
def mouseReleased():
    if mouseButton == LEFT: r.append(Rope())
    else:
        noLoop()
        saveFrame('project5-####.png')
        loop()
 
class Rope:
    def __init__(self):
        self.start = PVector(0, 0)
        self.p = [self.start]
        self.n = random(100000)
        self.c = color(random(128, 255), 24, random(84, 192))
        self.w = random(0.2, 4)
    
    def update(self):
        noiseDetail(32, 0.01)
        
        p = self.p[len(self.p) - 1]
        n = map(noise(self.n), 0, 1, -45, 675)
        l = 4
        
        if len(self.p) < 600:
            self.p.append(PVector(p.x + cos(radians(n)) * l, p.y + sin(radians(n)) * l))
        
        if n > 90: self.n += 0.5
        else: self.n += 0.2
    
    def display(self):
        stroke(self.c)
        strokeWeight(self.w)
        for i in range(len(self.p) - 1):
            line(self.p[i].x, self.p[i].y, self.p[i + 1].x, self.p[i + 1].y)
