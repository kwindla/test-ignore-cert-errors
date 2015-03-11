
// set as necessary: atom-shell executable
//
var atom_bin = 'atom';

var gulp = require('gulp'); 
var gulp_webserver  = require ('gulp-webserver');
var webpack = require ('webpack');
var webpack_dev_server = require ('webpack-dev-server');
var webpack_config = require ('./webpack.config.js');
var shell = require ('shelljs');

var exs = { silent: true };

gulp.task ('webservers', function () {
  gulp.src (['.'])
      .pipe (gulp_webserver ({
        host: '0.0.0.0',
        port: 8004,
        directoryListing: true,
      }));

  gulp.src (['.'])
      .pipe (gulp_webserver ({
        host: '0.0.0.0',
        port: 8005,
        directoryListing: true,
        https: true
      }));

	var cfg = Object.create (webpack_config);
	var wds = new webpack_dev_server (webpack(cfg), {
    https: true,
		publicPath: '/app',    // +   myConfig.output.publicPath,
	});
  wds.listen(8006);
});

gulp.task ('tests', function () {
  http_get ();
  https_gulp_get ();
  https_gulp_get_ignore_cert_errors ();
  https_webpack_get ();
  https_webpack_get_ignore_cert_errors ();
});

// ----

function http_get () {
  process.stdout.write ('http get, should work ... ');
  var exitval = shell.exec (atom_bin + ' app http 8004 ', exs).code;
  should_work (true, exitval);
}

function https_gulp_get () {
  process.stdout.write ('https get from gulp-webserver, should not work ... ');
  var exitval = shell.exec (atom_bin + ' app https 8005 false', exs).code;
  should_work (false, exitval);
}

function https_gulp_get_ignore_cert_errors () {
  process.stdout.write ('http get from gulp-webserver, should work ... ');
  var exitval = shell.exec (atom_bin + ' app https 8005 true', exs).code;
  should_work (true, exitval);
}

function https_webpack_get () {
  process.stdout.write ('https get from webpack-dev-server, ' +
                        'should not work ... ');
  var exitval = shell.exec (atom_bin + ' app https 8006 false', exs).code;
  should_work (false, exitval);
}

function https_webpack_get_ignore_cert_errors () {
  process.stdout.write ('http get from webpack-dev-server, should work ... ');
  var exitval = shell.exec (atom_bin + ' app https 8006 true', exs).code;
  should_work (true, exitval);
}

// ----

function should_work (tf, exitval) {
  if (tf ? (exitval === 0) : (exitval === 1)) {
    console.log ('[ok]');
  } else {
    console.log ('[not ok]');
  }
}

