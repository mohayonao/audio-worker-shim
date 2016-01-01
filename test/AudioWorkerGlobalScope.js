const assert = require("power-assert");
const sinon = require("sinon");
const AudioWorkerGlobalScope = require("../src/AudioWorkerGlobalScope");

describe("AudioWorkerGlobalScope", () => {
  describe("constructor(sampleRate: number)", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert(scope instanceof AudioWorkerGlobalScope);
    });
  });
  describe("#sampleRate: number", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert(scope.sampleRate === 44100);
    });
  });
  describe("#onmessage: function", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert(scope.onmessage === null);

      scope.onmessage = it;
      assert(scope.onmessage === it);

      scope.onmessage = "not function";
      assert(scope.onmessage === it);

      scope.onmessage = null;
      assert(scope.onmessage === null);
    });
  });
  describe("#onaudioprocess: function", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert(scope.onaudioprocess === null);

      scope.onaudioprocess = it;
      assert(scope.onaudioprocess === it);

      scope.onaudioprocess = "not function";
      assert(scope.onaudioprocess === it);

      scope.onaudioprocess = null;
      assert(scope.onaudioprocess === null);
    });
  });
  describe("#onnodecreate: function", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert(scope.onnodecreate === null);

      scope.onnodecreate = it;
      assert(scope.onnodecreate === it);

      scope.onnodecreate = "not function";
      assert(scope.onnodecreate === it);

      scope.onnodecreate = null;
      assert(scope.onnodecreate === null);
    });
  });
  describe("#parameters: AudioWorkerParamDescriptor[]", () => {
    it("works", () => {
      let target = { parameters: [ 1, 2, 3, 4, 5, 6, 7, 8 ] };
      let scope = new AudioWorkerGlobalScope(44100);

      assert.deepEqual(scope.parameters, []);

      scope.__target__ = target;
      assert.deepEqual(scope.parameters, target.parameters);
    });
  });
  describe("#postMessage(message: any): void", () => {
    it("works", (done) => {
      let scope = new AudioWorkerGlobalScope(44100);
      let message = { value: Math.random() };
      let target = { onmessage: sinon.spy() };

      scope.__target__ = target;
      scope.postMessage(message);

      setTimeout(() => {
        assert(target.onmessage.callCount === 1);
        assert.deepEqual(target.onmessage.args[0][0], { data: message });
        done();
      }, 0);
    });
  });
  describe("#postMessage(message: any): void", () => {
    it("works", (done) => {
      let scope = new AudioWorkerGlobalScope(44100);
      let message = { value: Math.random() };
      let target = { onmessage: sinon.spy() };

      scope.postMessage(message);

      setTimeout(() => {
        assert(target.onmessage.callCount === 0);
        done();
      }, 0);
    });
  });
  describe("#close(): void", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);

      assert.doesNotThrow(() => {
        scope.close();
      });
    });
  });
  describe("#addParameter(name: string, defaultValue): AudioParam", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);
      let target = { addParameter: sinon.spy() };

      scope.addParameter("foo", 0);
      assert(target.addParameter.callCount === 0);

      scope.__target__ = target;
      scope.addParameter("bar", 1);

      assert(target.addParameter.callCount === 1);
      assert.deepEqual(target.addParameter.args[0], [ "bar", 1 ]);
    });
  });
  describe("#removeParameter(name: string): void", () => {
    it("works", () => {
      let scope = new AudioWorkerGlobalScope(44100);
      let target = { removeParameter: sinon.spy() };

      scope.removeParameter("foo");
      assert(target.removeParameter.callCount === 0);

      scope.__target__ = target;
      scope.removeParameter("bar");

      assert(target.removeParameter.callCount === 1);
      assert.deepEqual(target.removeParameter.args[0], [ "bar" ]);
    });
  });
});
