'use strict';
const { execSync } = require('child_process');
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// HTTP function invocation
const app = express();
app.get('/*', (req, res) => {
  try {
    console.log('\n***test fc internal endpoint***');
    const res = execSync('curl --connect-timeout 3 https://1.cn-shanghai-internal.fc.aliyuncs.com');
    console.log();
    console.log(res.toString('utf8'));
  } catch (e) {
    console.log('error when exec curl command.');
  }
  res.send('Hello FunctionCompute, http function\n');
});

// Event function invocation
app.post('/invoke', (req, res) => {
  res.send('Hello FunctionCompute, event function\n');
});

var server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

server.timeout = 0; // never timeout
server.keepAliveTimeout = 0; // keepalive, never timeout

