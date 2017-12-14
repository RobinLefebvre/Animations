class OrbitalBody {
    constructor(x, y) {
		this.r 				= 7;
		this.pixelPosition 	= { x : x , y : y };
		this.solarPosition 	= { x : metersInOnePixel.times(x) , y :  metersInOnePixel.times(y) };
        this.mass 			= new Big(5.9722e+22); 
		this.velocity 		= {x : new Big(0), y : new Big(0)};
		this.acceleration 	= {x : new Big(0.0), y : new Big(0.0)};
    }
    applyGravity() {
		let dx = star.solarPosition.x.minus(this.solarPosition.x);
		let dy = star.solarPosition.y.minus(this.solarPosition.y)
		let distance = hypot(dx, dy);
		let G = new Big (6.6708e-11);
		let force = (this.mass.times(star.mass)).div(distance.pow(2)).times(G);
		let ratio = force.div(distance);
		
		//console.log("Position : " + this.solarPosition.x.toFixed(0) + ", " + this.solarPosition.y.toFixed(0));
		console.log("Velocity : " + this.velocity.x.toFixed(0) + ", " + this.velocity.y.toFixed(0));
		//console.log("Acceleration : " + this.acceleration.x.toFixed(0) + ", " + this.acceleration.y.toFixed(0));
		this.acceleration.x = star.solarPosition.x.minus(this.solarPosition.x).times(ratio);
		this.acceleration.y = star.solarPosition.y.minus(this.solarPosition.y).times(ratio);
		
		this.velocity.x = this.velocity.x.plus(this.acceleration.x);
		this.velocity.y = this.velocity.y.plus(this.acceleration.y);
		
    }
	applyPixelGravity(){
		let distance = dist(this.pixelPosition.x, this.pixelPosition.y, star.pixelPosition.x, star.pixelPosition.y);
        let force = ((this.mass * star.mass) / pow(distance, 2));
        let ratio = force/distance;
		
        this.acceleration.x = (star.pixelPosition.x - this.pixelPosition.x) * ratio;
        this.acceleration.y = (star.pixelPosition.y - this.pixelPosition.y) * ratio;

        this.velocity.x += this.acceleration.x ;
        this.velocity.y += this.acceleration.y;  
	}
    update() {
        this.pixelPosition.x = this.solarPosition.x.div(metersInOnePixel);
        this.pixelPosition.y = this.solarPosition.y.div(metersInOnePixel);
		
		this.solarPosition.x = this.solarPosition.x.plus(this.velocity.x);
		this.solarPosition.y = this.solarPosition.y.plus(this.velocity.y);
    }
    crashed() {
        if (dist(this.pixelPosition.x, this.pixelPosition.y, star.pixelPosition.x, star.pixelPosition.y) < star.r) {
            return true;
        }
        return false;
    }
    show() {
        fill(255);
        noStroke();
        ellipse(this.pixelPosition.x, this.pixelPosition.y, this.r, this.r);
    }
}