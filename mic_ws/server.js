(function () {
  'use strict';

  var fs = require('fs');

    // you'll probably load configuration from config
  var cfg = {
    ssl: true,
    port: 8080,
    ssl_key: '/home/pi/mic_ws/ssl/key.pem',
    ssl_cert: '/home/pi/mic_ws/ssl/cert.pem'
  };

  var httpServ = (cfg.ssl) ? require('https') : require('http');

  const WebSocket = require('ws');
  const WebSocketServer = WebSocket.Server;

  const app = httpServ.createServer({
      key: fs.readFileSync(cfg.ssl_key),
      cert: fs.readFileSync(cfg.ssl_cert)
    }).listen(cfg.port);

  const wss = new WebSocketServer({ server: app, rejectUnauthorized: false });

  const Speaker = require('speaker');

	const speaker = new Speaker({
	  channels: 1,          // 1 channel
	  bitDepth: 32,         // 32-bit samples
	  sampleRate: 48000,     // 48,000 Hz sample rate
	  signed:true
	});

	wss.on('connection', function connection(ws) {
	  ws.on('message', function incoming(message) {
	    if(true){
	      console.log('got audio_stream!');
	    }
	    if(message && message.length > 0){
	    	speaker.write(message);
	    }
	    
	  });
	});

}());
