
let ready = false;

let osc;
let osc2; 
let lfo;

let wave;


// Canvas size
function setup() {
  createCanvas(windowWidth, windowHeight);

  

  osc = new Tone.Oscillator();
  //osc.type = 'triangle'; 4 differents types: sine (default), square, triangle and sawtooth

  //osc.frequency.value = 220;// 220 hrz / A3 //osc.connect(Tone.Master);
  osc.toDestination();// or like this) this is the thing which is outputting the audio

  osc2 = new Tone.Oscillator();
  osc2.frequency.value = 220;// 220 hrz / A3 //osc.connect(Tone.Master);
  osc2.toDestination();// or like this) this is the thing which is outputting the audio

  lfo = new Tone.LFO("0.1hz", 210, 230);
  //lfo.connect(osc.frequency);

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
    //from negative to positive
    let start = 0;
    for (let i=1; i < buffer.length; i++){
        if (buffer[i-1] < 0 && buffer[i] >= 0) {
            start = i; 
            break; //interrupt the loop
        }
    }
//drawing the wave
    let end = start + buffer.length/2;
    for (let i=start; i < end; i++){ //i=0 for dots
        let x1 = map(i-1, start, end, 0, width);
        let y1 = map(buffer[i-1], -1, 1, 0, height);

        let x2 = map(i, start, end, 0, width);
        let y2 = map(buffer[i], -1, 1, 0, height);
        
        line(x1,y1,x2, y2);

    }

  } else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("START", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {


    osc.start();
    osc2.start();
    //lfo.start();
    ready = true;
  }
  
}
