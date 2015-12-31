const assert = require("power-assert");
const sinon = require("sinon");
const AudioWorkerNodeProcessor = require("../src/AudioWorkerNodeProcessor");

describe("AudioWorkerNodeProcessor", () => {
  describe("()", () => {
    it("works", () => {
      let processor = new AudioWorkerNodeProcessor();

      assert(processor instanceof AudioWorkerNodeProcessor);
    });
  });
  describe("#onmessage: function", () => {
    it("works", () => {
      let processor = new AudioWorkerNodeProcessor();

      assert(processor.onmessage === null);

      processor.onmessage = it;
      assert(processor.onmessage === it);

      processor.onmessage = "not function";
      assert(processor.onmessage === it);

      processor.onmessage = null;
      assert(processor.onmessage === null);
    });
  });
  describe("#postMessage(message: any): void", () => {
    it("works", (done) => {
      let processor = new AudioWorkerNodeProcessor();
      let message = { value: Math.random() };
      let target = { onmessage: sinon.spy() };

      processor.__target__ = target;
      processor.postMessage(message);

      setTimeout(() => {
        assert(target.onmessage.callCount === 1);
        assert.deepEqual(target.onmessage.args[0][0], { data: message });
        done();
      }, 0);
    });
  });
  describe("#postMessage(message: any): void", () => {
    it("works", (done) => {
      let processor = new AudioWorkerNodeProcessor();
      let message = { value: Math.random() };
      let target = { onmessage: sinon.spy() };

      processor.postMessage(message);

      setTimeout(() => {
        assert(target.onmessage.callCount === 0);
        done();
      }, 0);
    });
  });
});
