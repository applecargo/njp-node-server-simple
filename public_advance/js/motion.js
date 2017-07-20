//[[PROBLEM CASE]]
// for "LG X5"

// var acc = ev.accelerationIncludingGravity; // works.
// var acc = ev.acceleration; // doesn't work!! no service.

//--> try following algorithm, only when ev.acceleration.x fails!!

// //example)) canceling static acceleration (==gravity) from acceleration readings.. @ android documentation..
// public void onSensorChanged(SensorEvent event)
// {
//     // alpha is calculated as t / (t + dT)
//     // with t, the low-pass filter's time-constant
//     // and dT, the event delivery rate

//     final float alpha = 0.8;

//     gravity[0] = alpha * gravity[0] + (1 - alpha) * event.values[0];
//     gravity[1] = alpha * gravity[1] + (1 - alpha) * event.values[1];
//     gravity[2] = alpha * gravity[2] + (1 - alpha) * event.values[2];

//     linear_acceleration[0] = event.values[0] - gravity[0];
//     linear_acceleration[1] = event.values[1] - gravity[1];
//     linear_acceleration[2] = event.values[2] - gravity[2];
// }

function Sensors () {

    //private
    this._data = {
	do: {
	    alpha: 0,
	    beta: 0,
	    gamma: 0,
	    absolute: false
	},
	dm: {
	    x: 0,
	    y: 0,
	    z: 0,
	    gx: 0,
	    gy: 0,
	    gz: 0,
	    alpha: 0,
	    beta: 0,
	    gamma: 0
	},
	//LG X5 patch - estimated gravity
	eg: {
	    x: 0,
	    y: 0,
	    z: 0
	}
    }

    this._gravitysign = 0;

    //naming inspired from gyronorm.js

    // data.do.alpha	( deviceorientation event alpha value )
    // data.do.beta		( deviceorientation event beta value )
    // data.do.gamma	( deviceorientation event gamma value )
    // data.do.absolute	( deviceorientation event absolute value )

    // data.dm.x		( devicemotion event acceleration x value )
    // data.dm.y		( devicemotion event acceleration y value )
    // data.dm.z		( devicemotion event acceleration z value )

    // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
    // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
    // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

    // data.dm.alpha	( devicemotion event rotationRate alpha value )
    // data.dm.beta		( devicemotion event rotationRate beta value )
    // data.dm.gamma	( devicemotion event rotationRate gamma value )

    //public
    //attach handlers
    var availability = 'none';
    if(window.DeviceMotionEvent){
	window.addEventListener("devicemotion", (this._motion).bind(this), false);
	availability = 'motion-only';
    }
    if(window.DeviceOrientationEvent){
	window.addEventListener("deviceorientation", (this._orientation).bind(this), false);
	if (availability == 'motion-only') {
	    availability = 'all';
	} else {
	    availability = 'orientation-only';
	}
    }
    this.availability = availability;
    this.linaccelpatch = false; // set this to 'true' to enable patch to re-calculate linear acceleration.
    
    this.data = {
	do: {
	    alpha: 0,
	    beta: 0,
	    gamma: 0,
	    absolute: false
	},
	dm: {
	    x: 0,
	    y: 0,
	    z: 0,
	    gx: 0,
	    gy: 0,
	    gz: 0,
	    alpha: 0,
	    beta: 0,
	    gamma: 0
	},
	tilts: {
	    x: 0,
	    y: 0
	}
    }
}

Sensors.prototype._motion = function(ev) {

    //to achieve uniform coord. between devices (currently only for accelerationIncludingGravity)
    if (this._gravitysign == 0) {
	if (ev.accelerationIncludingGravity.z > 0) this._gravitysign = 1;
	else this._gravitysign = -1;
    }
    
    this._data.dm.x = ev.acceleration.x;
    this._data.dm.y = ev.acceleration.y;
    this._data.dm.z = ev.acceleration.z;
    this._data.dm.gx = ev.accelerationIncludingGravity.x*this._gravitysign*-1;
    this._data.dm.gy = ev.accelerationIncludingGravity.y*this._gravitysign*-1;
    this._data.dm.gz = ev.accelerationIncludingGravity.z*this._gravitysign*-1;
    this._data.dm.alpha = ev.rotationRate.alpha;
    this._data.dm.beta = ev.rotationRate.beta;
    this._data.dm.gamma = ev.rotationRate.gamma;

    if (ev.acceleration.x == null) { //LG X5 patch..
	this.linaccelpatch = true;
    }

    if (this.linaccelpatch == true) {
	var lpf_a = 0.8; //estimation speed
	this._data.eg.x = lpf_a*this._data.eg.x + (1 - lpf_a)*this._data.dm.gx;
	this._data.eg.y = lpf_a*this._data.eg.y + (1 - lpf_a)*this._data.dm.gy;
	this._data.eg.z = lpf_a*this._data.eg.z + (1 - lpf_a)*this._data.dm.gz;
	this._data.dm.x = this._data.dm.gx - this._data.eg.x;
	this._data.dm.y = this._data.dm.gy - this._data.eg.y;
	this._data.dm.z = this._data.dm.gz - this._data.eg.z;
    }
}

Sensors.prototype._orientation = function(ev) {
    
    //to achieve uniform coord. between devices
    // if (this._gravitysign != 0) {
    // 	this._data.do.alpha = ev.alpha*this._gravitysign*-1;
    // 	this._data.do.beta = ev.beta*this._gravitysign*-1;
    // 	this._data.do.gamma = ev.gamma*this._gravitysign*-1;
    // } else {
	this._data.do.alpha = ev.alpha;
	this._data.do.beta = ev.beta;
	this._data.do.gamma = ev.gamma;
    // }

    this._data.do.absolute = ev.absolute;
}

Sensors.prototype.snapshot = function() {
    this.data.dm.x        = this._data.dm.x / 9.8; // normalized
    this.data.dm.y	  = this._data.dm.y / 9.8; // normalized
    this.data.dm.z	  = this._data.dm.z / 9.8; // normalized
    this.data.dm.gx	  = this._data.dm.gx / 9.8; // normalized
    this.data.dm.gy	  = this._data.dm.gy / 9.8; // normalized
    this.data.dm.gz	  = this._data.dm.gz / 9.8; // normalized
    this.data.dm.alpha	  = this._data.dm.alpha; //deg/s
    this.data.dm.beta	  = this._data.dm.beta; //deg/s
    this.data.dm.gamma	  = this._data.dm.gamma; //deg/s
    this.data.do.alpha	  = this._data.do.alpha / 180 - 1; // normalized
    this.data.do.beta	  = this._data.do.beta / 180; // normalized
    this.data.do.gamma	  = this._data.do.gamma / 90; // normalized
    this.data.do.absolute = this._data.do.absolute;
    
    //cook accel to get more close 'tilts' as mobmuplat's tilts
    var cookedx = this.data.dm.gx;
    var cookedy = this.data.dm.gy;
    if (cookedx>0 && this.data.dm.gz>0) cookedx = (2-cookedx);
    else if (cookedx<0 && this.data.dm.gz>0) cookedx = (-2-cookedx);
    if (cookedy>0 && this.data.dm.gz>0) cookedy = (2-cookedy);
    else if (cookedy<0 && this.data.dm.gz>0) cookedy = (-2-cookedy);
    if (cookedx<-1) cookedx = -1;
    else if (cookedx>1) cookedx = 1;
    if (cookedy<-1) cookedy = -1;
    else if (cookedy>1) cookedy = 1;
    this.data.tilts.x = cookedx;
    this.data.tilts.y = cookedy;

    return this.data;
}

var g_tiltsx = 0;
var g_tiltsy = 0;
var g_accelx = 0;
var g_accely = 0;
var g_accelz = 0;
var g_motiony = 0;
var g_motionp = 0;
var g_motionr = 0;

var g_posep = 0;
var g_poser = 0;

var g_s = new Sensors();

function motionprocessing (motioncallback) {

    // motion sensing.
    var sensed = 0;
    var state = 0; //0 : ready, 1: tringgering, 2: triggered
    var holdcnt = 0;
    var sum = 0;
    var mavg_motionp = new Mavg(2);
    // var mavg_motionr = new Mavg(20);
    var mavg_motionr = new Mavg(5);
    var mavg_tiltsy = new Mavg(20);
    var motioncapture = setInterval(function() {

	//
	var data = g_s.snapshot();
	//
	g_tiltsx = data.tilts.x;
	g_tiltsy = data.tilts.y;
	g_accelx = data.dm.x;
	g_accely = data.dm.y;
	g_accelz = data.dm.z;
	g_motiony = data.do.alpha;
	g_motionp = data.do.beta;
	g_motionr = data.do.gamma;

	//any jerky motion!!
	sensed = Math.abs(g_accelx) + Math.abs(g_accely) + Math.abs(g_accelz);

	mavg_motionp.push(Math.abs(g_motionp));
	mavg_motionr.push(Math.abs(g_motionr));
	// mavg_tiltsy.push(Math.abs(g_tiltsy));
	g_posep = mavg_motionp.get(); //nice to check front/back
	g_poser = mavg_motionr.get(); //nice to check upright/flat

    	//thresholding emulation. bang/freeze/ready again.
    	if (state == 0) { //ready
    	    if (sensed > 2) {
    		//bang!!
    		motioncallback(g_poser, g_posep);
    		state = 1; //triggering
    		holdcnt = 7;
    	    }
    	}
    	else if (state == 1) { //triggering
    	    holdcnt = holdcnt - 1;
    	    if (holdcnt <= 0) {
    		state = 2; //triggered
    	    }
    	}
    	else if (state == 2) { //triggered
	    // if (sensed < 2) { //comment out this to allow re-triggering!! --> more pleasure.
    	    state = 0; //ready
	    // }
    	}

    }, 50);
}
