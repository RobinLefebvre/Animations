function Walker(r, g, b){
	this.position = createVector(width/2, height/2);
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);

	this.radius = random(0.1,2.5);
	this.maxForce = random(0.1,2);
	this.maxSpeed = random(7,10);

	this.coloration = color(r,g,b);
	this.randomFactor = random(1000);

	this.show= function(){
		noStroke();
		fill(this.coloration);
		ellipse(this.position.x, this.position.y, this.radius,this.radius);
	}

	this.updatePosition= function(){
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
	this.positionAround = function(vector, size){
		this.position = createVector(vector.x + random(-size / 12,size / 12), vector.y + random(-size / 12,size / 12));
	}
	this.randomizeColor= function(){
		this.coloration = color(random(255),random(255),random(255));
	}
	this.seek = function(target) {
		var desired = this.position.sub(target);
		desired.setMag(this.maxSpeed);

		// Steering = Desired minus velocity
		var steer = this.velocity.sub(desired);
		steer.limit(this.maxForce);
		this.applyForce(steer);
	}
	this.applyForce= function(force){
		this.acceleration.add(force);
	}
}
