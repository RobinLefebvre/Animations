var canvas;
var walkers;
var resetButton;
var randomButton;
var sliderR;
var sliderG;
var sliderB;
var sizeSlide;
var customButton;
var checker;
var mousePos;


function setup(){
	walkers = new WalkerGroup(random(255), random(255), random(255), 100);
	walkers.randomize();
	//Create a canvas and put it into the canvasHolder section of the html
	canvas = createCanvas(windowWidth ,windowHeight);
	
	// Set canvas background to white
	background(255);
	
	//Reset button 
	resetButton = select("#resetButton");
	resetButton.mousePressed(resetBackground);


	randomButton = select("#randomButton");
	randomButton.mousePressed(randomColorChange);
	
	sliderR = select("#R");
	sliderG = select("#G");
	sliderB = select("#B");
	
	sizeSlide = select("#size");
	customButton = select("#customButton");
	customButton.mousePressed(customWalkers);
	
	checker = select("#checker");
}

function randomColorChange(){
	walkers.randomize();
}

function customWalkers(){
	walkers = new WalkerGroup(random(255), random(255), random(255), sizeSlide.value());
	walkers.colorChange(sliderR.value(), sliderG.value(), sliderB.value());
}

function windowResized(){
	canvas.style("height", windowHeight);
	canvas.style("width", windowWidth);
}

function mouseDragged(){
	mousePos = createVector(mouseX, mouseY);
	walkers.displayWalkers(mousePos);
}
function draw(){
	mousePos = createVector(mouseX,mouseY);
	if (checker.checked()){
		walkers.walkersEffect(mousePos);
	}
}

function resetBackground(){
	background(255);
}