var multipleVal = 100;
var worldCnv = document.getElementById("world");
var ctx = worldCnv.getContext("2d");
ctx.fillStyle="#f00";
ctx.globalCompositeOperation = "source-over";
var linesCoords = [];

function roboLoc(x,y){ //initial robot location
	h = worldCnv.height;
	newX = x*multipleVal;
	newY = h - y*multipleVal;
	return [newX,newY];
}

function newDim(w,h){ //new dimensions of world in pixels
	newW = w*multipleVal;
	newH = h*multipleVal;
	worldCnv.width = newW;
	worldCnv.height = newH;
}

function newCoords(x1,y1,x2,y2){ //new coordinates; converted from meters to pixels
	h = worldCnv.height;
	nx1 = x1*multipleVal;
	ny1 = h - y1*multipleVal;
	nx2 = x2*multipleVal;
	ny2 = h - y2*multipleVal;
	return [nx1,ny1,nx2,ny2];
}

function lineCoords(x1,y1,x2,y2){ //put list of coordinates for each line into a master list
	var newXYs = newCoords(x1,y1,x2,y2);
	linesCoords.push(newXYs);
}

function drawLine(x1,y1,x2,y2){ //draws one line
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function convert2Pixl(x,y){
	
	return [x*multipleVal, worldCnv.height-y*multipleVal];
}
 
function drawMeterPolygon(coordsList, x, y){ //list of xys 
	/*
	Draw the robot as a polygon, by using the converted, pixel
	coodinates of each corner of the robot. 
	
	moveTo initiates starting point of robot, lineTo indicates
	the following corners/points of the robot. 
	
	closePath finishes by drawing a line/closes between last point to first point
	
	parameters x and y (of robot's center) adjusts to the actual position on the canvas
	*/
	
	ctx.fillStyle="#f00"; //color of robot
	var xyPixls = [];
	for (thing in coordsList){
		var xy = convert2Pixl((coordsList[thing][0]+x), (coordsList[thing][1]+y));
		xyPixls.push(xy);
	}
	var ind=0;
	ctx.beginPath();
	ctx.moveTo(xyPixls[ind][0]+x, xyPixls[ind][1]+y);
	while (ind<xyPixls.length-1){
		ctx.lineTo(xyPixls[ind+1][0]+x, xyPixls[ind+1][1]+y);
		ind++;
	}
	ctx.closePath();
	ctx.fill();
}

