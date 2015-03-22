"use strict";

var assert = require("assert");

require("../");

describe("AudioContext", function() {
  describe("createAudioWorker", function() {
    it("(scriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function(done) {
      var audioContext = new global.AudioContext();
      var node = audioContext.createAudioWorker("test_worker.js");

      assert(node instanceof global.AudioNode);

      setTimeout(done, 0);
    });
    it("(syntaxErrorScriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function(done) {
      var audioContext = new global.AudioContext();
      var node = audioContext.createAudioWorker("syntax_error.js");

      assert(node instanceof global.AudioNode);

      setTimeout(done, 0);
    });
    it("(notFoundScriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function(done) {
      var audioContext = new global.AudioContext();
      var node = audioContext.createAudioWorker("not_found.js");

      assert(node instanceof global.AudioNode);

      setTimeout(done, 0);
    });
  });
});

describe("OfflineAudioContext", function() {
  describe("createAudioWorker", function() {
    it("(scriptURL: string, numberOfInputChannels: number, numberOfOutputChannels: number): AudioNode", function(done) {
      var audioContext = new global.OfflineAudioContext(2, 44100, 44100);
      var node = audioContext.createAudioWorker("test_worker.js");

      assert(node instanceof global.AudioNode);

      setTimeout(done, 0);
    });
  });
});
