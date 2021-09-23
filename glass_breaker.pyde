mouse = False
p = []

def setup():
    size(1000, 1000)
    frameRate(30)
    
    a = PVector(width * 0.1, height * 0.1)
    b = PVector(width * 0.9, height * 0.1)
    c = PVector(width * 0.9, height * 0.9)
    d = PVector(width * 0.1, height * 0.9)
    first = [a, b, c, d]
    
    p.append(Polygon(first))

def draw():
    background(0)
    global mouse
    
    for i in range(len(p)):
        p[i].display()
        
        if mouseInPolygon(p[i].points):
            fill(180, 72)
            stroke(255)
            strokeWeight(2)
            
            for j in range(len(p[i].points)):
                line(p[i].points[j].x, p[i].points[j].y, mouseX, mouseY)
            
            if mouse:
                rand = getRandom(len(p[i].points) + 1)
                
                for j in range(len(p[i].points)):
                    for k in range(len(p[i].dv(rand))):
                        m = p[i].dv(rand)[j][k]
                        n = p[i].dv(rand)[j][k + 1]
                        z = [m, n, PVector(mouseX, mouseY)]
                        
                        p.append(Polygon(z))
                
                p.remove(p[i])
                mouse = False

def mouseInPolygon(polygon):
    c = 0
    
    for i in range(len(polygon)):
        m = polygon[i]
        if i == len(polygon) - 1: n = polygon[0]
        else: n = polygon[i + 1]
        
        if (m.y > mouseY) != (n.y > mouseY):
            x = (((n.x - m.x) / (n.y - m.y) * (mouseY - m.y))) + m.x
            if mouseX < x:
                c += 1
    
    if c % 2 == 1: return True
    else: return False

def getRandom(num):
    r = [0, 1]
    for i in range(num - 2):
        r.append(random(1))
    r.sort()
    return r

def mouseReleased():
    global mouse
    if mouseButton == LEFT: mouse = True
    else:
        mouse = False
        saveFrame('glass-breaker_####.png')

class Polygon:
    def __init__(self, points):
        self.points = points
        self.t = random(12, 96)
    
    def display(self):
        fill(180, 128) if mouseInPolygon(self.points) else fill(180, self.t)
        stroke(128)
        strokeWeight(0.5)
        
        beginShape()
        for i in range(len(self.points)):
            vertex(self.points[i].x, self.points[i].y)
        endShape(CLOSE)
    
    def dv(self, r):
        splitPoint = []
        
        for i in range(len(self.points)):
            p = []
            m = self.points[i]
            if i == len(self.points) - 1: n = self.points[0]
            else: n = self.points[i + 1]
            
            for j in range(len(self.points) + 1):
                q = PVector(lerp(m.x, n.x, r[j]), lerp(m.y, n.y, r[j]))
                p.append(q)
            splitPoint.append(p)
        return splitPoint
