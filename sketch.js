
let ready = false;

let osc; 

let wave;


// Canvas size
function setup() {
  createCanvas(windowWidth, windowHeight);

  osc = new Tone.Oscillator();

  osc.frequency.value = 220;// 220 hrz / A3

  //osc.connect(Tone.Master);
  osc.toDestination();// or like this) this is the thing which is outputting the audio

  wave = new Tone.Waveform();
  Tone.Master.connect(wave);

  Tone.Master.volume.value = -15; //.value = -15; .rampTo(-30, 2); to make volume down

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Main render loop
function draw() {
  background(0);

  if (ready) {
    
    osc.frequency.value = map(mouseX, 0, width, 110, 880);// it makes sound with mouse) 

    stroke(255);
//visualisation
    let buffer = wave.getValue(0);
    for (let i=1; i < buffer.length; i++){ //i=0 for dots
        let x1 = map(i-1, 0, buffer.length, 0, width);
        let y1 = map(buffer[i-1], -1, 1, 0, height);

        let x2 = map(i, 0, buffer.length, 0, width);
        let y2 = map(buffer[i], -1, 1, 0, height);
        
        line(x1,y1,x2, y2);

    }

  } else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(" START", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {


    osc.start();
    ready = true;
  }
  
}
