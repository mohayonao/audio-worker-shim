const assert = require("power-assert");
const AudioWorkerParamDescriptor = require("../src/AudioWorkerParamDescriptor");

describe("AudioWorkerParamDescriptor", () => {
  describe("(name: string, defaultValue: number)", () => {
    it("works", () => {
      let descriptor = new AudioWorkerParamDescriptor("name", 0);

      assert(descriptor instanceof AudioWorkerParamDescriptor);
    });
  });
  describe("#name: string", () => {
    it("works", () => {
      let descriptor = new AudioWorkerParamDescriptor("name", 0);

      assert(descriptor.name === "name");
    });
  });
  describe("#defaultValue: string", () => {
    it("works", () => {
      let descriptor = new AudioWorkerParamDescriptor("name", 0);

      assert(descriptor.defaultValue === 0);
    });
  });
});
