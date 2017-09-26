// Actual sequence data
let fullFib = ["1","1"];
let currentIndex = 2;

//Dom elements
let indexDisplay;
let fibDisplay;
let saveAmount;
let isSaving;

// FrameRate check interval
let interval = setInterval(function(){checkFrameRate();}, 1000);

function setup(){
  frameRate(20);
	indexDisplay = select('#IndexDisplay');
	fibDisplay = select('#FibDisplay');
  saveAmount = select('#saveAmount');
}
function checkFrameRate(){
  if(frameRate() < 10){
      saveAmount.value(saveAmount.value()-5);
      if(saveAmount.value() < 1){
        saveAmount.value(1);
      }
  }
}
function draw(){
  for(var i = 0; i < saveAmount.value(); i++){
      fullFibo();
  }
}

function fullFibo(){
  //Actuall calculations, using the BigNumber library for arbitrary length
	var zero = new BigNumber(fullFib[currentIndex - 2]);
	var one = new BigNumber(fullFib[currentIndex - 1]);
	var res = zero.plus(one);
  
  // Pushing the results as a string into the array
	fullFib.push(res.toFixed().toString());
  
  if(document.getElementById('updateUI').checked){
    // Users would enjoy an interface, wouldn't they ?
    // Displaying last calculated number => TODO : p5 text for better rendering.
    indexDisplay.html("Fibannaci #" + currentIndex 
                      + " is " + fullFib[currentIndex].length + " digits long. <br/>");
    fibDisplay.html(fullFib[currentIndex]);
  }
  var framer = select('#FrameRateDisplay').html("Calculation rate : " + floor(frameRate()) + " - Index : " + currentIndex);
  // Users may want to save their sequence
  if(document.getElementById('isSaving').checked){
    var saveEvery = select('#saveInput').value();
    if(currentIndex % saveEvery == 0){
      // If the user has decided to save
      if(document.getElementById('saveSequence').checked){
        // If the user wants the full fibonacci sequence
        saveJSON(fullFib, 'fibo_sequence_until_' + currentIndex, true);
      }
      else{
        // If the user only wants the last number calculated
        saveJSON(fullFib[currentIndex], 'fibo_num_at_' + currentIndex, true);
      }
    }
  }
  // Iterator for the array. Not pretty.
  currentIndex ++;
}