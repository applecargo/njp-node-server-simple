$( document ).ready(function() {

  //overlay-ed flasher
  var flasher = new Flasher($('.flasher')[0], 500);

  //ui
  $('.ui-btn').click(function() {
    $(this).removeClass('bg-blue').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-blue');
    }.bind(this), 300);
  });

  //launchpad page...
  $('.ui-btn-clap').click(function() {
    $(this).removeClass('bg-blue').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-blue');
    }.bind(this), 300);
  });
  $('.ui-btn-clap').addClass('bg-blue');
  
  $('.ui-btn-brassball').click(function() {
    $(this).removeClass('bg-hot-pink').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-hot-pink');
    }.bind(this), 300);
  });
  $('.ui-btn-brassball').addClass('bg-hot-pink');
  
  $('.ui-btn-animal').click(function() {
    $(this).removeClass('bg-green').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-green');
    }.bind(this), 300);
  });
  $('.ui-btn-animal').addClass('bg-green');
  
  $('.ui-btn-yesno').click(function() {
    $(this).removeClass('bg-black').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-black');
    }.bind(this), 300);
  });
  $('.ui-btn-yesno').addClass('bg-black');
  
  $('.ui-btn-stop').click(function() {
    $(this).removeClass('bg-red').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-red');
    }.bind(this), 300);
  });
  $('.ui-btn-stop').addClass('bg-red');
  
  $('.ui-btn-cricket').click(function() {
    $(this).removeClass('bg-navy').addClass('bg-yellow');
    setTimeout(function() {
      $(this).removeClass('bg-yellow').addClass('bg-navy');
    }.bind(this), 300);
  });
  $('.ui-btn-cricket').addClass('bg-navy');
  
  $('.ui-btn-birthday').click(function() {
    $(this).removeClass('bg-hot-pink').addClass('bg-white');
    setTimeout(function() {
      $(this).removeClass('bg-white').addClass('bg-hot-pink');
    }.bind(this), 300);
  });
  $('.ui-btn-birthday').addClass('bg-hot-pink');
  
  $('.ui-btn-piano-white').click(function() {
    $(this).removeClass('fill-white').addClass('fill-yellow');
    setTimeout(function() {
      $(this).removeClass('fill-yellow').addClass('fill-white');
    }.bind(this), 300);
  });
  $('.ui-btn-piano-white').addClass('fill-white');

  $('.ui-tgl').change(function() {
    if ($(this).prop('checked') == true) {
      $(this).removeClass('bg-near-black').addClass('bg-white');
    }
    else {
      $(this).removeClass('bg-white').addClass('bg-near-black');
    }
  });

  $('.ui-tgl-pianoforall').change(function() {
    if ($(this).prop('checked') == true) {
      $(this).removeClass('bg-navy').addClass('bg-yellow');
    }
    else {
      $(this).removeClass('bg-yellow').addClass('bg-navy');
    }
  });
  $('.ui-tgl-pianoforall').prop('checked', false).change();
  
  ////paginations
  
  var pages = { //IMPORTANT : the order should match with 'index.html'!!
    'page-welcome': 0,
    'page-loading': 1,
    'page-checklist': 2,
    'page-piano': 3,
    'page-launchpad': 4,
    'page-birthday': 5
  };
  var cur_page = 0;
  function changePage(page) {
    $('.ui-page:nth(' + cur_page + ')').hide();
    $('.ui-page:nth(' + page + ')').show();
    cur_page = page;

    // absolute positioned things show/hide
    if (page == pages['page-piano']) { $('.ui-tgl-pianoforall').show(); }
    else { $('.ui-tgl-pianoforall').hide(); }
  }
  $('.go-checklist').click(function() { changePage(pages['page-checklist']); });
  $('.go-launchpad').click(function() { changePage(pages['page-launchpad']); });
  $('.go-piano').click(function() { changePage(pages['page-piano']); });
  $('.go-birthday').click(function() { changePage(pages['page-birthday']); });
  var pagechanger = setTimeout(function() { $('#go-loading').click(); }, 5000);
  $('.go-loading').click(function() {
    changePage(pages['page-loading']);
    audioloader();
    clearTimeout(pagechanger);
  });

  ////audio data loading

  var clap;
  var animal;
  var yesno;
  var phone;
  var stop;
  var singer;
  var brassball;

  function audioloader() {
    var url;

    //voices
    url = "audio/voices/voice@10/" + Math.floor(Math.random()*10+1) + "/";
    singer = new Tone.MultiPlayer(
      [
	url.concat("do.mp3"),
	url.concat("re.mp3"),
	url.concat("mi.mp3"),
	url.concat("fa.mp3"),
	url.concat("sol.mp3"),
	url.concat("la.mp3"),
	url.concat("si.mp3"),
	url.concat("highdo.mp3"),
	url.concat("highre.mp3"),
	url.concat("highmi.mp3")
      ]
    ).toMaster();

    //clap
    url = "audio/clap@2/" + ("0" + Math.floor(Math.random()*2+1)).slice(-2) + ".mp3";
    clap = new Tone.Player({ "url" : url }).toMaster();
    
    //brassball
    url = "audio/brassball@8/" + ("0" + Math.floor(Math.random()*8+1)).slice(-2) + ".mp3";
    brassball = new Tone.Player({ "url" : url }).toMaster();

    //animal
    url = "audio/animal@6/" + ("0" + Math.floor(Math.random()*6+1)).slice(-2) + ".mp3";
    animal = new Tone.Player({ "url" : url }).toMaster();

    //yesno
    url = "audio/yesno@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
    yesno = new Tone.Player({ "url" : url }).toMaster();

    //cricket
    url = "audio/cricket@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
    cricket = new Tone.Player({ "url" : url }).toMaster();

    //stop
    url = "audio/stop@1/" + ("0" + Math.floor(Math.random()*1+1)).slice(-2) + ".mp3";
    stop = new Tone.Player({ "url" : url }).toMaster();

    //buffering
    console.log('buffering started');
    Tone.Buffer.on("load", function(){
      console.log('buffering done');
      changePage(pages['page-checklist']);
    }.bind(this));
    //-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/

    ////sensor triggered effects
    
    // window.addEventListener("deviceorientation", function(event) {
    //     clap.playbackRate = (event.alpha-180)/180 + 1; //orientation
    // }, false);
    window.addEventListener("devicemotion", function(event) {
      var ax = event.accelerationIncludingGravity.x;
      var ay = event.accelerationIncludingGravity.y;
      var az = event.accelerationIncludingGravity.z;
      var dist = Math.sqrt(ax*ax + ay*ay + az*az) - 9.8; // 2-norm minus gravity
      // clap.playbackRate = dist + 1; //motion?? how to apply effects??
    }, false);
  }

  ////----------------------------------------------------------------////
  
  ////connect to message server
  
  var socket = io('https://choir.run');
  socket.on('connect', function() {
    $('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.
    socket.on('disconnect', function() {
      $('#netstat').prop('checked', false).change();
    });
  });

  ////local sounds (ui-triggered)
  
  //sndcheck audio
  $('.ui-clap').click(function() {
    clap.start();
    flasher.flash();
  });
  
  //sing-note by me. or by all!
  var sing_forall = false;
  $('.ui-tgl-pianoforall').click(function() {
    sing_forall = $(this).prop('checked');
  });
  $('.piano-do'    ).click(function() { singer.start(0); if (sing_forall == true) { socket.emit('sing-note', '/C4'); } flasher.flash(); } );
  $('.piano-re'    ).click(function() { singer.start(1); if (sing_forall == true) { socket.emit('sing-note', '/D4'); } flasher.flash(); } );
  $('.piano-mi'    ).click(function() { singer.start(2); if (sing_forall == true) { socket.emit('sing-note', '/E4'); } flasher.flash(); } );
  $('.piano-fa'    ).click(function() { singer.start(3); if (sing_forall == true) { socket.emit('sing-note', '/F4'); } flasher.flash(); } );
  $('.piano-sol'   ).click(function() { singer.start(4); if (sing_forall == true) { socket.emit('sing-note', '/G4'); } flasher.flash(); } );
  $('.piano-la'    ).click(function() { singer.start(5); if (sing_forall == true) { socket.emit('sing-note', '/A4'); } flasher.flash(); } );
  $('.piano-si'    ).click(function() { singer.start(6); if (sing_forall == true) { socket.emit('sing-note', '/B4'); } flasher.flash(); } );
  $('.piano-highdo').click(function() { singer.start(7); if (sing_forall == true) { socket.emit('sing-note', '/C5'); } flasher.flash(); } );
  $('.piano-highre').click(function() { singer.start(8); if (sing_forall == true) { socket.emit('sing-note', '/D5'); } flasher.flash(); } );
  $('.piano-highmi').click(function() { singer.start(9); if (sing_forall == true) { socket.emit('sing-note', '/E5'); } flasher.flash(); } );

  ////sound swarm TX (message-triggering)

  //launchpads
  $('.ui-btn-clap').click(function() {
    console.log('clap-go');
    socket.emit('sound', 'clap');
    clap.start();
    flasher.flash();
  });
  $('.ui-btn-brassball').click(function() {
    console.log('brassball-go');
    socket.emit('sound', 'brassball');
    brassball.start();
    flasher.flash();
  });
  $('.ui-btn-animal').click(function() {
    console.log('animal-go');
    socket.emit('sound', 'animal');
    animal.start();
    flasher.flash();
  });
  $('.ui-btn-yesno').click(function() {
    console.log('yesno-go');
    socket.emit('sound', 'yesno');
    yesno.start();
    flasher.flash();
  });
  $('.ui-btn-cricket').click(function() {
    console.log('cricket-go');
    socket.emit('sound', 'cricket');
    cricket.start();
    flasher.flash();
  });
  $('.ui-btn-stop').click(function() {
    console.log('stop-go');
    socket.emit('sound', 'stop');
    stop.start();
    // & stop all sounds!
    clap.stop();
    brassball.stop();
    animal.stop();
    yesno.stop();
    cricket.stop();
    // & stop sequence, too.
    bday_timers.forEach(function(item) { clearTimeout(item); });
    singer.stopAll();
    flasher.flash();
  });
  
  //birthday-go (network)
  //1 1 2 2 2 4 1 1 2 2 2 4 1 1 2 2 2 2 2 1 1 2 2 2 4 //rhythm
  //0 0 1 0 3 2 0 0 1 0 4 3 0 0 7 5 3 2 1 6 6 5 3 4 3 //melody
  var bday_timers = [];
  $('.birthday-go').click(function() {
    console.log('birthday-go');
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 0));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 500));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); singer.start(1); flasher.flash(); }, 1000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 2000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); singer.start(3); flasher.flash(); }, 3000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/E4'); singer.start(2); flasher.flash(); }, 4000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 6000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 6500));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); singer.start(1); flasher.flash(); }, 7000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 8000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/G4'); singer.start(4); flasher.flash(); }, 9000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); singer.start(3); flasher.flash(); }, 10000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 12000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); singer.start(0); flasher.flash(); }, 12500));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C5'); singer.start(7); flasher.flash(); }, 13000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/A4'); singer.start(5); flasher.flash(); }, 14000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); singer.start(3); flasher.flash(); }, 15000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/E4'); singer.start(2); flasher.flash(); }, 16000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); singer.start(1); flasher.flash(); }, 17000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/B4'); singer.start(6); flasher.flash(); }, 19000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/B4'); singer.start(6); flasher.flash(); }, 19500));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/A4'); singer.start(5); flasher.flash(); }, 20000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); singer.start(3); flasher.flash(); }, 21000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/G4'); singer.start(4); flasher.flash(); }, 22000));
    bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); singer.start(3); flasher.flash(); }, 23000));
    //done! clear array.
    bday_timers.push(setTimeout(function() { bday_timers = []; }, 25000));
  });
  
  ////sound swarm RX (message-triggered)
  
  //sing-note from network
  socket.on('sing-note', function(note) {
    console.log(note);
    switch(note) {
    case '/C4': singer.start(0); flasher.flash(); break;
    case '/D4': singer.start(1); flasher.flash(); break;
    case '/E4': singer.start(2); flasher.flash(); break;
    case '/F4': singer.start(3); flasher.flash(); break;
    case '/G4': singer.start(4); flasher.flash(); break;
    case '/A4': singer.start(5); flasher.flash(); break;
    case '/B4': singer.start(6); flasher.flash(); break;
    case '/C5': singer.start(7); flasher.flash(); break;
    case '/D5': singer.start(8); flasher.flash(); break;
    case '/E5': singer.start(9); flasher.flash(); break;
    default:
      ;
    }
  });

  //sound from network
  socket.on('sound', function(msg) {
    switch(msg) {
    case 'clap': clap.start(); flasher.flash(); break;
    case 'brassball': brassball.start(); flasher.flash(); break;
    case 'animal': animal.start(); flasher.flash(); break;
    case 'yesno': yesno.start(); flasher.flash(); break;
    case 'cricket': cricket.start(); flasher.flash(); break;
    case 'stop':
      stop.start();
      // & stop all sounds!
      clap.stop();
      brassball.stop();
      animal.stop();
      yesno.stop();
      cricket.stop();
      // & stop sequence, too.
      bday_timers.forEach(function(item) { clearTimeout(item); });
      singer.stopAll();
      flasher.flash();
      break;
    default:
      ;
    }
  });
});

// //birthday-go
// //time generator
// //1 1 2 2 2 4 1 1 2 2 2 4 1 1 2 2 2 2 4 1 1 2 2 2 4 //rhythm
// //0 0 1 0 3 2 0 0 1 0 4 3 0 0 7 5 3 2 1 6 6 5 3 4 3 //melody
// function bd_tgen() {
//     var bd_r = [1, 1, 2, 2, 2, 4, 1, 1, 2, 2, 2, 4, 1, 1, 2, 2, 2, 2, 4, 1, 1, 2, 2, 2, 4]; //rhythm
//     var bd_tscale = 500; //ms
//     var sum = 0;

//     for (var i = 0; i < 25; i++) {
// 	// console.log(bd_r[i]*bd_tscale);
// 	console.log(sum);
// 	sum = sum + bd_r[i]*bd_tscale;
//     }
// }


// balls = [];
// for (var idx = 0; idx < 6; idx++) {
//     url = "audio/balls@6/" + ("0" + (idx + 1)).slice(-2) + ".mp3"; // slice(-2) will select last(minus) two characters.
//     balls.push(new Tone.Player(url).toMaster());
// }


//ball
//to get duration of an audio sample in MultiPlayer loaded..
// singer.buffers.get(0)._buffer.duration
// ball.buffers.get(Math.random)._buffer.duration
