const mongoose = require('mongoose');
const process = require('process');
const url = require('url');

let defaultHost = '127.0.0.1';
let defaultPort = '27017';
let defaultName = 'example';

let defaultAutoReconnect = true;
let defaultAppName = 'Example App';

let auth;
if(typeof process.env['mongodb-username'] == 'string'
&& process.env['mongodb-username'].length > 0
&& typeof process.env['mongodb-password'] == 'string'
&& process.env['mongodb-password'].length > 0) {
  auth = `${encodeURIComponent(process.env['mongodb-username'])}:${encodeURIComponent(process.env['mongodb-password'])}`;
}

let connectUrl = process.env['mongodb-url'] || url.format({
  auth,
  protocol:   'mongodb',
  hostname:   process.env['mongodb-host'] || defaultHost,
  port:       process.env['mongodb-port'] || defaultPort,
  pathname:   process.env['mongodb-name'] || defaultName,
  slashes:    true
});

module.exports = mongoose.createConnection(connectUrl, {
  autoReconnect:    Boolean(process.env['mongodb-autoReconnect'] || defaultAutoReconnect),
  appname:          process.env['mongodb-appName'] || defaultAppName,
  useNewUrlParser:  true
}).useDb(process.env['mongodb-name'] || defaultName);