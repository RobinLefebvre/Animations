function WalkerGroup(r, g, b, groupSize){
	
	this.groupSize = groupSize;
	this.walkers = [];

	for (var i = this.groupSize + 1; i > 0; i--){
		this.walkers[i] = new Walker(r,g,b);
	}

	this.displayWalkers = function(mousePos){
		for (var i = this.groupSize + 1; i > 0; i--){
			this.walkers[i].positionAround(mousePos, this.groupSize);
			this.walkers[i].show();
		}
	}
	this.walkersEffect = function(mousePos){
		for (var i = this.groupSize + 1; i > 0; i--){
			this.walkers[i].position.x += random(-2,2);
			this.walkers[i].position.y += random(-2,2);
			this.walkers[i].show();
		}
	}
	this.colorChange = function(r,g,b){
		for (var j = this.groupSize + 1; j > 0; j--){
			this.walkers[j].coloration = color(r,g,b);
		}
	}
	this.randomize = function(){
		for (var l = this.groupSize + 1; l > 0; l--){
			this.walkers[l].randomizeColor();
		}
	}
  
}