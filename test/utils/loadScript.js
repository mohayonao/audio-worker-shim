const assert = require("power-assert");
const XMLHttpRequest = require("../browser-libs/xml-http-request");
const loadScript = require("../../src/utils/loadScript");

describe("loadScript(scriptURL: string): Promise<string>", () => {
  it("works", () => {
    return loadScript("./xml-http-request.js").then((text) => {
      assert(typeof text === "string");
    });
  });
  it("not found", () => {
    return loadScript("xxx").catch((e) => {
      assert(e.message === "Not Found");
    });
  });
  it("else", () => {
    XMLHttpRequest.inject = function() {
      this.statusText = "ERROR!";
      this.onerror();
    };
    return loadScript("xxx").catch((e) => {
      assert(e.message === "ERROR!");
      XMLHttpRequest.inject = null;
    });
  });
});
