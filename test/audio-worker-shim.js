"use strict";

var assert = require("assert");

require("../");

describe("AudioContext", function() {
  describe("createAudioWorker", function() {
    it("(scriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function() {
      var audioContext = new global.AudioContext();
      var node = audioContext.createAudioWorker("test_worker.js");

      assert(node instanceof global.AudioNode);
    });
  });
});

describe("OfflineAudioContext", function() {
  describe("createAudioWorker", function() {
    it("(scriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function() {
      var audioContext = new global.OfflineAudioContext(2, 44100, 44100);
      var node = audioContext.createAudioWorker("test_worker.js");

      assert(node instanceof global.AudioNode);
    });
  });
});
