const assert = require("power-assert");
const sinon = require("sinon");
const AudioWorker = require("../src/AudioWorker");

describe("AudioWorker", () => {
  let audioContext, scope;

  class AudioNode {}

  beforeEach(() => {
    audioContext = {
      sampleRate: 44100,
      createScriptProcessor: sinon.spy(() => new AudioNode()),
    };
    scope = {};
  });

  describe("constructor(audioContext: AudioContext, scope: AudioWorkerGlobalScope)", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      assert(worker instanceof AudioWorker);
    });
  });
  describe("#onmessage: function", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      assert(worker.onmessage === null);

      worker.onmessage = it;
      assert(worker.onmessage === it);

      worker.onmessage = "not function";
      assert(worker.onmessage === it);

      worker.onmessage = null;
      assert(worker.onmessage === null);
    });
  });
  describe("#onloaded: function", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      assert(worker.onloaded === null);

      worker.onloaded = it;
      assert(worker.onloaded === it);

      worker.onloaded = "not function";
      assert(worker.onloaded === it);

      worker.onloaded = null;
      assert(worker.onloaded === null);
    });
  });
  describe("#parameters: AudioWorkerParamDescriptor[]", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      assert.deepEqual(worker.parameters, []);
    });
  });
  describe("#postMessage(message: any): void", () => {
    it("works", (done) => {
      let worker = new AudioWorker(audioContext, scope);
      let message = { value: Math.random() };

      worker.postMessage(message);

      scope.onmessage = (e) => {
        assert(e.data === message);
        done();
      };
    });
    it("not work", () => {
      let worker = new AudioWorker(audioContext, scope);
      let message = { value: Math.random() };

      worker.postMessage(message);
    });
  });
  describe("#createNode(numberOfInputs: number, numberOfOutputs: number): AudioWorkerNode", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);
      let node = worker.createNode(1, 1);

      assert(node instanceof AudioNode);
    });
    it("works with onnodecreate", (done) => {
      let worker = new AudioWorker(audioContext, scope);
      let node = worker.createNode(1, 1);

      assert(node instanceof AudioNode);

      scope.onnodecreate = (e) => {
        assert(e.type === "nodecreate");
        assert(e.inputs.length === 1);
        assert(e.outputs.length === 1);
        done();
      };
    });
  });
  describe("#addParameter(name: string, defaultValue: number): AudioParam??", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      worker.addParameter("frequency", 880);
      worker.addParameter("frequency", 660);
      worker.addParameter("detune");

      assert.deepEqual(worker.parameters.map(({ name, defaultValue }) => ({ name, defaultValue })), [
        { name: "frequency", defaultValue: 880 },
        { name: "detune", defaultValue: 0 },
      ]);
    });
  });
  describe("#removeParameter(name: string): void", () => {
    it("works", () => {
      let worker = new AudioWorker(audioContext, scope);

      worker.addParameter("frequency", 880);
      worker.addParameter("detune");
      worker.removeParameter("detune");
      worker.removeParameter("detune");

      assert.deepEqual(worker.parameters.map(({ name, defaultValue }) => ({ name, defaultValue })), [
        { name: "frequency", defaultValue: 880 },
      ]);
    });
  });
  describe(".create(audioContext: AudioContext, workerThread: function): Promise<AudioWorker>", () => {
    it("works", () => {
      let workerThread = sinon.spy();

      return AudioWorker.create(audioContext, workerThread).then((worker) => {
        assert(worker instanceof AudioWorker);
        assert(workerThread.callCount === 1);
        assert(workerThread.args[0][0].sampleRate === audioContext.sampleRate);
      });
    });
    it("works with onloaded", (done) => {
      let workerThread = sinon.spy();

      AudioWorker.create(audioContext, workerThread).then((worker) => {
        assert(worker instanceof AudioWorker);
        assert(workerThread.callCount === 1);
        assert(workerThread.args[0][0].sampleRate === audioContext.sampleRate);

        worker.onloaded = sinon.spy(() => {
          done();
        });
      });
    });
  });
});
