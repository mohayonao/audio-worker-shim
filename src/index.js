const AudioWorker = require("./AudioWorker");
const loadScript = require("./utils/loadScript");
const AudioContext = global.AudioContext || global.webkitAudioContext;

module.exports = function(compiler) {
  const compile = compiler.compile || null;

  function create(audioContext, scriptURL) {
    return loadScript(scriptURL).then((code) => {
      if (compile) {
        code = compile(code);
      }
      return AudioWorker.create(audioContext, eval.call(null, `
        (function(self) { "use strict"; ${ code } })
      `));
    });
  }

  function polyfill() {
    if (AudioContext && !AudioContext.prototype.createAudioWorker) {
      AudioContext.prototype.createAudioWorker = function(scriptURL) {
        return create(this, scriptURL);
      };
    }
  }

  return { create, polyfill };
};
