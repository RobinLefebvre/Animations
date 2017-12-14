/* Based on https://merijn-dh.github.io/p5-js/02%20Gravity/ 
Coding Train community
*/
let system;
let star;
let bodies = [];
let metersInOnePixel;

function setup() {
	Big.NE = -20;
	Big.PE = 20;
	let pixelsInScreen = (windowWidth >= windowHeight) ?  windowHeight :  windowWidth;
    let canvas = createCanvas(windowWidth , windowHeight);
	canvas.position(0,0);
	
	frameRate(24);
	let metersInScreen = new Big(150000000000000); /* AU */
	
	metersInOnePixel  = new Big(metersInScreen.div(pixelsInScreen).toFixed(0));
	
    star = new Star();
}

function draw() {
	background('rgba(0,0,0, 0.01)');
    for (let i = 0; i < bodies.length; i ++) {
        bodies[i].applyGravity();
        bodies[i].update();
        if (bodies[i].crashed()) {
            bodies.splice(i, 1);
            i = i - 1;
        } else {
            bodies[i].show();
        }
    }
	star.show();
}

/* Might need to change this even, mouseReleased isn't very intuitive*/
function mouseReleased() {
    let newPlanet = new OrbitalBody(mouseX.toFixed(0) , mouseY.toFixed(0) );
    bodies.push(newPlanet);
}

function hypot(x,y){
	x = x.abs();
	y = y.abs();
	let z = (x.gt(y)) ? x : y;
	let r = (x.lt(y)) ? x.div(z): y.div(z);
	
	let t = r.times(r).plus(1).sqrt(); 
	return z.times(t);
}