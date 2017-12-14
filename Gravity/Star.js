/* Based on https://merijn-dh.github.io/p5-js/02%20Gravity/ 
Coding Train community
*/

/* Kinda felt like the star needs to be it's own object. */
class Star {
	constructor(){
		this.r = 50;
		this.mass = new Big(1.98855e+24);
		
		this.pixelPosition = createVector(width / 2, height / 2, 0);
		
		this.solarPosition = {x : metersInOnePixel.times(width/2), y : metersInOnePixel.times(height/2)};
	}
	show(){
		fill(255,255,51);
		strokeWeight(2);
		stroke(0);
		ellipse(this.pixelPosition.x, this.pixelPosition.y,this.r, this.r);
	}
}
