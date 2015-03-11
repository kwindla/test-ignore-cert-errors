

var App, BrowserWindow, IPC, window, timeout_timer,
    protocol = process.argv[2],
    port = process.argv[3],
    ignore_cert_errors = process.argv[4] === 'true' ? true : false;

if (! (protocol && port)) {
    console.error (
      'usage: <atom-bin> . <protocol> <port> [ignore-cert-errors]' + "\n" +
      ' - eg: ~/bin/atom . https 8006 true 2> /dev/null'
    );
    process.exit (1);
}

var App = require ('app');
if (ignore_cert_errors) {
  // console.log ('setting --ignore-certificate-errors switch');
  App.commandLine.appendSwitch ('ignore-certificate-errors', 'true');
}

BrowserWindow = require ('browser-window');
IPC = require ('ipc');
 
// ----

App.on ('ready', function () {
  var url = protocol + '://localhost:' + port + '/app/test.html';

  IPC.on ('loaded-okay', function (evt, arg) {
    success ();
  });

  process.stdout.write ('loading ' + url + ' ... ');
  window = new BrowserWindow ({ width: 320, height: 240 });
  window.loadUrl (url);

  setTimeout (timeout, 1500);
});

function success () {
  console.log ('ok');
  process.exit (0);
}

function timeout () {
  console.log ('failed');
  process.exit (1);
}

