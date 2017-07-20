$( document ).ready(function() {

    //overlay-ed flasher
    var flasher = new Flasher($('.flasher')[0], 2000);

    //network
    var socket = io('https://choir.run'); //temporal ip - amazon aws ec2 server
    var netstat = new Tgl($(".netstat")[0], 'bg-white', 'bg-near-black', null, null);
    socket.on('connect', function() {
	netstat.set();
	socket.on('disconnect', function() {
	    netstat.clear();
	});
    });

    //sound enabler (especially for iOS users/devices)
    var touch = new Btn($(".touch")[0], 'bg-white', 'bg-near-black', 300, function() {
	synth_beep.osc.frequency.value =
	    Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
	synth_beep.start();
	// socket.emit('sound','touch'); // this will feed-forward forever. fun, but out of control.
    });
    //resolve covering issue..
    $('.flasher').click(function (){
	touch.click();
    });

    ////audio sample loading
    var boo = new Tone.MultiPlayer(
	[
	    "audio/boobab@3/01.wav",
	    "audio/boobab@3/02.wav",
	    "audio/boobab@3/03.wav"
	]
    ).toMaster();
    var marimba = new Tone.MultiPlayer(
	[
	    "audio/marimba@15/01.wav",
	    "audio/marimba@15/02.wav",
	    "audio/marimba@15/03.wav",
	    "audio/marimba@15/04.wav",
	    "audio/marimba@15/05.wav",
	    "audio/marimba@15/06.wav",
	    "audio/marimba@15/07.wav",
	    "audio/marimba@15/08.wav",
	    "audio/marimba@15/09.wav",
	    "audio/marimba@15/10.wav",
	    "audio/marimba@15/11.wav",
	    "audio/marimba@15/12.wav",
	    "audio/marimba@15/13.wav",
	    "audio/marimba@15/14.wav",
	    "audio/marimba@15/15.wav"
	]
    ).toMaster();
    //dog
    var dog = new Tone.MultiPlayer(
	[
	    "audio/dog@2/01.wav",
	    "audio/dog@2/02.wav"
	]
    ).toMaster();
    //cat
    var cat = new Tone.MultiPlayer(
	[
	    "audio/cat@3/01.wav",
	    "audio/cat@3/02.wav",
	    "audio/cat@3/03.wav"
	]
    ).toMaster();
    //whistle
    var whistle = new Tone.MultiPlayer(
	[
	    "audio/whistle@1/01.wav"
	]
    ).toMaster();
    //cymbal
    var cymbal = new Tone.MultiPlayer(
	[
	    "audio/cymbal@1/01.wav"
	]
    ).toMaster();
    //cricket
    var seatNo_str = ("0" + (Math.ceil(Math.random()*12))).slice(-2);
    var cricket = new Tone.Player("audio/cricket@12/" + seatNo_str + ".mp3").toMaster();
    console.log(seatNo_str);
    console.log("audio/cricket@12/" + seatNo_str + ".mp3");

    ////////audio
    ////beep-tone
    var synth_beep = new Synth_beep();
    // var synth_beep = new Synth_beepshift();

    ////noise
    var synth_whistle = new Synth_whistle();
    
    //program change by network msg.
    var program = 0;
    socket.on('sound', function(msg) {
	program = msg;
	console.log(program);
	$('.prog-no').text(program);
	if (msg == 4) {
	    //start cricket
	    cricket.start();
	}
	// if (msg == 5) {
	//     //stop cricket?
	//     cricket.stop();
	// }
    });

    //programs
    function actioncallback(poser, posep) {
	switch(program) {
	case 0: //marimba
	    //bang!
	    if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    marimba.start(Math.floor(Math.random()*15));
		}
		else {// snap, back
		    marimba.start(Math.floor(Math.random()*15));
		    // synth_beep.osc.frequency.value =
		    // 	Tone.Frequency(Math.floor(Math.random()*12 + 60), "midi").toFrequency();
		    // synth_beep.start();
		}
	    }
	    else {// waving
		marimba.start(Math.floor(Math.random()*15));
	    }
	    //screen bang!
	    flasher.flash();
	    break;
	case 1: // boo/bap
	    //bang!
	    if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    boo.start(0);
		}
		else {// snap, back
		    boo.start(1);
		}
	    }
	    else {// waving
		boo.start(2);
	    }
	    //screen bang!
	    flasher.flash();
	    break;
	case 2: // dog/cat/cymbal
	    //bang!
	    // if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    dog.start(Math.floor(Math.random()*2));
		}
		else {// snap, back
		    cat.start(Math.floor(Math.random()*3));
		}
	    // }
	    // else {// waving
	    // 	// cymbal.start(0);
	    // }
	    //screen bang!
	    flasher.flash();
	    break;
	case 3: //noise
	    //bang!
	    if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    synth_whistle.filter.frequency.value =
			Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
		    synth_whistle.start();
		}
		else {// snap, back
		    synth_whistle.stop();
		    // marimba.start(Math.floor(Math.random()*15));
		}
	    }
	    else {// waving
		// marimba.start(Math.floor(Math.random()*15));
	    }
	    //screen bang!
	    flasher.flash();
	    break;
	case 4: //noise + cricket
	    //bang!
	    // if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    synth_whistle.filter.frequency.value =
			Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
		    synth_whistle.start();
		}
		else {// snap, back
		    synth_whistle.stop();
		    // marimba.start(Math.floor(Math.random()*15));
		}
	    // }
	    // else {// waving
	    // 	// marimba.start(Math.floor(Math.random()*15));
	    // }
	    //screen bang!
	    flasher.flash();
	    break;
	case 5: //silence
	    //screen bang!
	    // flasher.flash();
	    $(flasher.elem).fadeIn();
	    synth_whistle.stop();
	    break;
	default:
	    ;
	}
    }

    //// motion capture
    //refer --> motion.js
    motionprocessing(actioncallback);

    // var ws_poser = new Webscope($('.ws_poser')[0], -2, 2, 300);
    // var ws_posep = new Webscope($('.ws_posep')[0], -2, 2, 300);
    // var ws_motionr = new Webscope($('.ws_motionr')[0], -2, 2, 300);
    // var ws_tiltsy = new Webscope($('.ws_tiltsy')[0], -2, 2, 300);
    // var motionscope = setInterval(function() {
    // 	ws_poser.update(g_poser);
    // 	ws_posep.update(g_posep);
    // 	ws_motionr.update(Math.abs(g_motionr));
    // 	ws_tiltsy.update(Math.abs(g_tiltsy));
    // }, 50);
});
