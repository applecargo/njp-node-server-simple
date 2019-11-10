// njp center exhibition node server - old school version. (no new features)
var fs = require('fs');

//prepare credentials & etc
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/choir.run/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/choir.run/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

//https WWW server @ port 443
var express = require('express');
var app = express();
var httpsWebServer = https.createServer(credentials, app).listen(443, function () {
  console.log('[express] listening on *:443');
});
//express configuration
app.use(express.static('public'));

//http Redirection server @ port 80 ==> Don't get why this works.. all others not. ==> https://stackoverflow.com/a/23283173
var http = require('http');
var httpApp = express();
var httpRouter = express.Router();
httpApp.use('*', httpRouter);
httpRouter.get('*', function(req, res){
    var host = req.get('Host');
    // replace the port in the host
    host = host.replace(/:\d+$/, ":"+app.get('port'));
    // determine the redirect destination
    var destination = ['https://', host, req.url].join('');
    return res.redirect(destination);
});
var httpServer = http.createServer(httpApp);
httpServer.listen(80);

//https socket.io server @ port 443 (same port as WWW service)
var io = require('socket.io')(httpsWebServer, {'pingInterval': 1000, 'pingTimeout': 3000});

io.on('connection', function(socket){

  //msg. for everybody - oneshot sounds
  socket.on('sound', function(msg) {
    socket.broadcast.emit('sound', msg); // sending to all clients except sender
    console.log('sound :' + msg);
  });

  //msg. for everyone - notes
  socket.on('sing-note', function(msg) {
    socket.broadcast.emit('sing-note', msg); // sending to all clients except sender
    console.log('sing-note :' + msg);
  });

  //
  socket.on('disconnect', function(){
    console.log('instrument user disconnected');
  });

});

//// osc.js/udp service
var osc = require("osc");

var udp_sc = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 54321,
    metadata: true
});

//message handler
udp_sc.on("message", function (oscmsg, timetag, info) {
    console.log("[udp] got osc message:", oscmsg);

    //EX)
    // //method [1] : just relay as a whole
    // ioInst.emit('osc-msg', oscmsg); //broadcast

    //EX)
    // //method [2] : each fields
    // ioInst.emit('osc-address', oscmsg.address); //broadcast
    // ioInst.emit('osc-type', oscmsg.type); //broadcast
    // ioInst.emit('osc-args', oscmsg.args); //broadcast
    // ioInst.emit('osc-value0', oscmsg.args[0].value); //broadcast

    //just grab i need.. note!
    io.emit('sing-note', oscmsg.address); //broadcast
});
//open port
udp_sc.open();
udp_sc.on("ready", function() {
    console.log("[udp] ready... - 0.0.0.0:", udp_sc.options.localPort);
});
