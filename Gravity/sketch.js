/* Based on https://merijn-dh.github.io/p5-js/02%20Gravity/ 
Coding Train community
*/

let planets = [];

function setup() {
    let canvas = createCanvas(windowWidth , windowHeight);
	canvas.position(0,0);
	let systemRadius = (windowWidth >= windowHeight) ? (width / 2) :  (height / 2);
	console.log(systemRadius);
	
	
	noFill();
	strokeWeight(3);
	stroke(255,0,0);
	ellipse(width /2, height / 2, systemRadius, systemRadius);
	
    star.x = width/2;
    star.y = height/2;
}

function draw() {
	background('rgba(5,0,20, 0.05)');
    for (let i = 0; i < planets.length; i ++) {
        planets[i].applyGravity();
        planets[i].update();
        if (planets[i].crashed()) {
            planets.splice(i, 1);
            i = i - 1;
        } else {
            planets[i].show();
        }
    }
	displayStar();
}

function displayStar(){
	fill(255,255,51);
	noStroke();
    ellipse(star.x,star.y,star.r, star.r);
}
/* Might need to change this even, mouseReleased isn't very intuitive*/
function mouseReleased() {
    let newPlanet = new OrbitalBody(mouseX, mouseY);
    planets.push(newPlanet);
}