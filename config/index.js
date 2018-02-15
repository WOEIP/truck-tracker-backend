
'use strict';

const path = require('path');
const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'production',
    env: 'NODE_ENV',
    arg: 'env',
  },
  port: {
    doc: 'The port for the http server to listen on.',
    format: 'port',
    default: -1,
    env: 'PORT',
    arg: 'port',
  },
});

const configFile = `${config.get('env')}.json`;

config.loadFile(path.resolve(__dirname, configFile));

try {
  config.loadFile(path.resolve(__dirname, 'secret', configFile));
} catch (e) {
  // ignore no such file errors, secrets might be passed via env args
  if (e.code !== 'ENOENT') throw e;
}

config.validate({allowed: 'strict'});

module.exports = config;
