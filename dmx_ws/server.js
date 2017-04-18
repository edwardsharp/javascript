'use strict';

const spawn = require( 'child_process' ).spawn;

const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });

const DEBUG = true;

var dmxMessage = new Array(511);

const defaultBoardSliders = 24;

for(var i=0;i<defaultBoardSliders;i++){
  dmxMessage[i] = 0;
}

var dmxJSON = function(){
  return JSON.stringify( dmxMessage.filter(function (n) { return (n !== undefined && n !== null); }) );
}

var uDMX = function(argz){
  var _uDMX = spawn( '/home/pi/uDMX', argz );

  _uDMX.stdout.on( 'data', data => {
      if(DEBUG){
        console.log( `stdout: ${data}` );
      }
    }
  });

  _uDMX.stderr.on( 'data', data => {
      if(DEBUG){
        console.log( `stderr: ${data}` );
      }
  });

  _uDMX.on( 'close', code => {
      if(DEBUG){
        console.log( `child process exited with code ${code}` );
      }
  });

};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // ws.send(Date.now());
    if(DEBUG){
      console.log('received: %s', message);
    }
    var json = JSON.parse(message);
    
    if( json.idx && json.value && !isNaN(parseInt(json.idx)) && !isNaN(parseInt(json.value)) ){
      if(DEBUG){
        console.log('got key/val:',json.idx,json.value);
      }
      uDMX([json.idx,json.value]);
      dmxMessage[json.idx] = parseInt(json.value);
    }
    
    
    // ws.send( dmxJSON() );

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send( dmxJSON() );
      }
    });

  });
 
  ws.send( dmxJSON() );
});


//CLIENT
// const ws = new WebSocket('wss://'+os.hostname(), {
//   origin: 'https://' + os.hostname()
// });
 
// ws.on('open', function open() {
//   console.log('connected');
//   ws.send(Date.now());
// });
 
// ws.on('close', function close() {
//   console.log('disconnected');
// });
 
// ws.on('message', function incoming(data, flags) {
//   console.log(`Roundtrip time: ${Date.now() - data} ms`, flags);
 
//   setTimeout(function timeout() {
//     ws.send(Date.now());
//   }, 500);
// });
