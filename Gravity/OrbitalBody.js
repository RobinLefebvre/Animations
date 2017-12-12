class OrbitalBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5;
        this.vx = 3.0;
        this.vy = 0.0;
        this.mass = 25;
        this.ax = 0.0;
        this.ay = 0.0;
		this.displayInfo = false;
    }
    applyGravity() {
        let distance = dist(this.x, this.y, star.x, star.y);
        let force = ((this.mass * star.mass) / pow(distance, 2));
        let ratio = force/distance;

        this.ax = (star.x - this.x) * ratio;
        this.ay = (star.y - this.y) * ratio;
        this.vx += this.ax;
        this.vy += this.ay;     
        //this.vx += this.ax;
        //this.vy += this.ay;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
    crashed() {
        if (dist(this.x, this.y, star.x, star.y) < star.r/2) {
            return true;
        }
        return false;
    }
    show() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
		
		if(this.displayInfo){
			background(0);
			text("Vel : (" + this.vx.toPrecision(2) + "," + this.vy.toPrecision(2) + ")", this.x +5, this.y);
			let vel = abs((this.vx + this.vy).toPrecision(2));
			text("Total : " + vel + " pix/frame",this.x +5, this.y - 13);
		}
    }
}