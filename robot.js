/*
 * robot_description: a list of vertices describing the robot's body
 * Each vertex is represented with a list of two elements defining the horizontal (X) and
 *  vertical displacement (Y) of the vertex relative to the robot's center when the robot
 *  is at angle 0 (looking straight to the right).
 */

var robotDescription = [
    [-0.1905, 0.09525],
    [-0.0889, 0.180975],
    [0.0, 0.200025],
    [0.0889, 0.180975],
    [0.1905, 0.09525],
    [0.1905, -0.0635],
    [0.1651, -0.0635],
    [0.1651, -0.1651],
    [0.0889, -0.23495],
    [-0.0889, -0.23495],
    [-0.1651, -0.1651],
    [-0.1651, -0.0635],
    [-0.1905, -0.0635],
];

/*
var sonarDescription = [
 [0,0.1,Math.PI/2.0],
 [0.1,0,0],
 [0,-0.1,-Math.PI/2.0]
];
*/
var base_angle = -Math.PI/2.0;


/*
 * Draws the robot on a canvas defined by the context ctx
 * x,y position is in meters relative to the bottom left of the center point.
 * angle is in radians relative to looking straight right.
 */


 /*
draws an enclosed figure using moveTo and lineTo for every line segment

function draw_robot2(x,y,angle,ctx) {
	angle += base_angle;
	for (n=0;n<robotDescription.length;n++){

		var x1 = robotDescription[n][0];
		var y1 = robotDescription[n][1];
		var x2 = robotDescription[(n+1)%robotDescription.length][0];
		var y2 = robotDescription[(n+1)%robotDescription.length][1];

		var xp1 = x1*Math.cos(angle) - y1*Math.sin(angle);
		var yp1 = x1*Math.sin(angle) + y1*Math.cos(angle);

		var xp2 = x2*Math.cos(angle) - y2*Math.sin(angle);
		var yp2 = x2*Math.sin(angle) + y2*Math.cos(angle);

		drawMeterLine(xp1+x, yp1+y, xp2+x, yp2+y);
	}
}
*/

function draw_sonars(lengthsList,rx,ry,a){
	//list of all of sonar's points, starting xy to ending xy of each sonar line

	var sonarPoints = [];
	var angle = a;

	for(s=0;s<sonarDescription.length;s++){
		var sx1 = sonarDescription[s][0];
		var sy1 = sonarDescription[s][1];
		var sAngle = sonarDescription[s][2];

		//geometric tranformations of starting point x,y of each sonar
		//with respect to angle of robot at each frame

		var sxp1 = sx1*Math.cos(angle)-sy1*Math.sin(angle);
		var syp1 = sx1*Math.sin(angle)+sy1*Math.cos(angle);
		sonarPoints.push([sxp1,syp1]);

		//geometric transformations of ending points of each sonar
		//negative sign in front of Math to flip the middle sonar up

		var sxp2 = (sxp1+lengthsList[s])*Math.cos(sAngle+angle) - (syp1+lengthsList[s])*Math.sin(sAngle+angle);
		//original: sx1 * - Math.cos(sAngle+angle+Math.PI/2) - (sy1 + lengthsList[s])*-Math.sin(sAngle+angle+Math.PI/2);
		var syp2 = (sxp1+lengthsList[s])*Math.sin(sAngle+angle) + (syp1+lengthsList[s])*Math.cos(sAngle+angle);
		sonarPoints.push([sxp2,syp2]);

	}

	//sonar's starting and ending points in pixels
	//total is (number of sonars * 2) pairs

	var sonarPixels = [];
	for (pair in sonarPoints){
		//sonar's points adjusted for robot's position rx and ry

		var sxypixel = convert2Pixl((sonarPoints[pair][0]+rx), (sonarPoints[pair][1]+ry));
		sonarPixels.push(sxypixel);
	}

	var count=0;
	//draws each sonar by pairing; every two [x,y] combos is one sonar
	while(count<(sonarPixels.length-1)){
		ctx.moveTo(sonarPixels[count][0], sonarPixels[count][1]);
		ctx.lineTo(sonarPixels[count+1][0], sonarPixels[count+1][1]);
		ctx.stroke();
		count=count+2; //skips the next xy pairing
	}

}


function draw_robot(x,y,angle,ctx) {
	/*
	Doesn't actually draw the robot, but passes a list of
	coordinates of the robot's description to drawMeterPolygon,
	which actually draw the robot. The list of coordinates are
	adjusted for angles but are still in meters
	*/

	angle += base_angle;

	var roboCoordsAdjusted = [];

	n=0;
	//starting points for robot
	var x1 = robotDescription[n][0];
	var y1 = robotDescription[n][1];

	//starting points coords adjusted for angle; same if angle is 0
	var xp1 = x1*Math.cos(angle) - y1*Math.sin(angle);
	var yp1 = x1*Math.sin(angle) + y1*Math.cos(angle);
	roboCoordsAdjusted.push([xp1, yp1]);

	while (n<robotDescription.length-1){

		var x2 = robotDescription[n+1][0];
		var y2 = robotDescription[n+1][1];

		var xp2 = x2*Math.cos(angle) - y2*Math.sin(angle);
		var yp2 = x2*Math.sin(angle) + y2*Math.cos(angle);

		roboCoordsAdjusted.push([xp2,yp2]);
		n++;
	}
	drawMeterPolygon(roboCoordsAdjusted, x, y);
}
