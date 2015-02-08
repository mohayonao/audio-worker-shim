"use strict";

var AudioContext = global.AudioContext || global.webkitAudioContext;
var AudioWorkerNode = require("audio-worker-node");

if (AudioContext && !AudioContext.prototype.createAudioWorker) {
  AudioContext.prototype.createAudioWorker = function(scriptURL, numberOfInputChannels, numberOfOutputChannels) {
    return new AudioWorkerNode(this, scriptURL, numberOfInputChannels, numberOfOutputChannels);
  };
}
