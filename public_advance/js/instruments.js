function Synth_beep () {
    this.ampEnv = new Tone.AmplitudeEnvelope({
    	"attack": 0.1,
    	"decay": 0.3,
    	"sustain": 0,
    	"release": 0
    }).toMaster();
    
    this.osc = new Tone.Oscillator(440, "sine").connect(this.ampEnv);
    this.osc.start();
    
    this.start = function() {
	this.osc.start();
	this.ampEnv.triggerAttackRelease(0.4);
    }
}

function Synth_beepshift () {
    this.ampEnv = new Tone.AmplitudeEnvelope({
    	"attack": 0.1,
    	"decay": 0.3,
    	"sustain": 0,
    	"release": 0
    }).toMaster();

    this.pitchShift = new Tone.PitchShift({
	"pitch": 0,
	"feedback": 0.5
    }).connect(this.ampEnv);
    
    this.osc = new Tone.Oscillator(440, "sine").connect(this.pitchShift);
    this.osc.start();
    
    this.start = function() {
	this.osc.start();
	this.ampEnv.triggerAttackRelease(0.4);
    }

    // this.shifter = function(master) {
    // 	this.pitchShift
}

function Synth_whistle () {
    this.noise_type = [
	"white",
	"brown",
	"pink"
    ];

    this.ampEnv = new Tone.AmplitudeEnvelope({
    	"attack": 0.1,
    	"decay": 0.3,
    	"sustain": 0.9,
    	"release": 0.2
    }).toMaster();
    
    this.gain = new Tone.Gain({
	"gain" : 45
    }).connect(this.ampEnv);
    
    this.filter = new Tone.Filter({
	"type" : "bandpass",
	"frequency" : 350,
	"Q" : 180
    }).connect(this.gain);
    
    this.noise = new Tone.Noise("pink").connect(this.filter);
    this.noise.start();

    this.start = function() {
	this.ampEnv.triggerAttack();
    }
    
    this.stop = function() {
	this.ampEnv.triggerRelease();
    }
}
