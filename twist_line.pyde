r = [] 
 
def setup():
    size(600, 1000)
    frameRate(30)
    
    r.append(Rope()) 
 
def draw():
    background(255, 255, 245)
    
    for i in range(len(r)):
        r[i].update()
        r[i].display() 
 
def mouseReleased():
    if mouseButton == LEFT: r.append(Rope())
    else: saveFrame('project5-####.png') 
 
class Rope:
    def __init__():
        self.start = PVector(0, 0)
        self.p = [self.start]
        self.n = random(100000)
        self.c = color(random(128, 255), 24, random(84, 192))
        self.w = random(0.2, 4)
    
    def update():
        noiseDetail(32, 0.01)
        
        p = self.p[len(self.p) - 1]
        n = map(noise(self.n), 0, 1, -45, 675)
        l = 4
        
        if p.x <= width or p.y <= height:
            self.p.append(PVector(p.x + cos(radians(n)) * l, p.y + sin(radians(n)) * 1))
        
        if n > 90: self.n += 0.7
        else: self.n += 0.2
    
    def display():
        stroke(self.c)
        strokeWeight(self.w)
        for i in range(len(p) - 1):
            line(self.p[i].x, self.p[i].y, self.p[i + 1].x, self.p[i + 1].y)
