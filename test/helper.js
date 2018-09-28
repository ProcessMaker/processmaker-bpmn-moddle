'use strict';

var fs = require('fs');


function readFile(filename) {
  return fs.readFileSync(filename, { encoding: 'UTF-8' });
}

module.exports.readFile = readFile;


var BpmnModdle = require('bpmn-moddle').default;

var descriptor = require('../resources/processmaker');

function createModdle() {
  return new BpmnModdle({
    pm: descriptor
  });
}

module.exports.createModdle = createModdle;
