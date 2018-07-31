/*
 * XYATs describes the robot's motion as a list of:
 * [0](X position): horizontal displacement from the left in meters
 * [1](Y position): vertical displacement from the bottom in meters
 * [2](angular position): angle in radians relative to looking straight to the right.
 * [3](timestamp): time in milliseconds when the robot is in this position (starting at 0)
 * The timestamp of the first position defines the starting time.
 */

var x = 0;
var y = 0;
var i = 0;

function drawRobot(){ //draws Robot and World
	//BEGIN DRAWING
	x = XYATs[i][0];
	y = XYATs[i][1];
	a = XYATs[i][2];

	ctx.clearRect(0, 0, worldCnv.width, worldCnv.height);
	ctx.beginPath();

	draw_robot(x,y,a,ctx);

	/*
	//sonar lengths
	sLengths = sonarLengths[i];

	draw_sonars(sLengths,x,y,a);
  */
	for (e in linesCoords){
		a = linesCoords[e][0];
		b = linesCoords[e][1];
		c = linesCoords[e][2];
		d = linesCoords[e][3];
		drawLine(a,b,c,d);
	}

	ctx.closePath();
	//END DRAWING
}

function draw(){
	window.requestAnimationFrame(drawRobot);
	//ctx.globalCompositeOperation ="source-over";
	if (i+rewind < XYATs.length && i+rewind >= 0) {
		drawLoop = setTimeout(function(){
			i=i+rewind;
			draw();
		}, rewind*(XYATs[i+rewind][3]-XYATs[i][3]));
	}

	ctx.restore();
}
//draw();
