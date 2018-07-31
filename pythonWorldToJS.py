WORLD_PATH = 'C:\\Python35\\Lib\\site-packages\\soar\\worlds\\'
FILE = 'random.py'

robotLoc = (0,0)
worldDim = (1,1)
wallsCoords = []

def initialRobotLoc(x,y):
    global robotLoc
    robotLoc = (x,y)

def dimensions(w,l):
    global worldDim
    worldDim = (w,l)

def wall(tup1, tup2):
    global wallsCoords
    wallCoords = tup1+tup2
    wallsCoords.append(wallCoords)

exec(open(WORLD_PATH + FILE).read())

print("newDim" + str(worldDim) +";")
print("drawRobot" + str(robotLoc) + ";")

for i in wallsCoords:
    print("lineCoords" + str(i) + ";")


