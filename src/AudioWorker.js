const AudioWorkerNode = require("audio-worker-node");
const AudioWorkerGlobalScope = require("./AudioWorkerGlobalScope");
const AudioWorkerNodeProcessor = require("./AudioWorkerNodeProcessor");
const AudioWorkerParamDescriptor = require("./AudioWorkerParamDescriptor");
const findIndex = require("lodash.findindex");

class AudioWorker {
  static create(audioContext, workerThread) {
    return new Promise(function(resolve) {
      let scope = new AudioWorkerGlobalScope(audioContext.sampleRate);
      let worker = new AudioWorker(audioContext, scope);

      setTimeout(() => {
        workerThread.call(scope, scope);

        resolve(worker);

        setTimeout(() => {
          if (typeof worker._onloaded === "function") {
            worker._onloaded({ type: "loaded" });
          }
        }, 0);
      }, 0);
    });
  }

  constructor(audioContext, scope) {
    this.__target__ = scope;
    scope.__target__ = this;

    this._context = audioContext;
    this._onmessage = null;
    this._onloaded = null;
    this._parameters = [];
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(callback) {
    if (callback === null || typeof callback === "function") {
      this._onmessage = callback;
    }
  }

  get onloaded() {
    return this._onloaded;
  }

  set onloaded(callback) {
    if (callback === null || typeof callback === "function") {
      this._onloaded = callback;
    }
  }

  get parameters() {
    return this._parameters.slice();
  }

  postMessage(message) {
    setTimeout(() => {
      if (this.__target__ && typeof this.__target__.onmessage === "function") {
        this.__target__.onmessage({ data: message });
      }
    }, 0);
  }

  terminate() {}

  createNode(numberOfInputs, numberOfOutputs) {
    let proc = new AudioWorkerNodeProcessor();
    let node = new AudioWorkerNode(this._context, this.__target__.onaudioprocess, {
      numberOfInputs: numberOfInputs,
      numberOfOutputs: numberOfOutputs,
      parameters: this._parameters,
      processor: proc,
    });

    setTimeout(() => {
      if (this.__target__ && typeof this.__target__.onnodecreate === "function") {
        node.__target__ = proc;
        proc.__target__ = node;

        this.__target__.onnodecreate({
          type: "nodecreate",
          node: proc,
          inputs: new Array(numberOfInputs),
          outputs: new Array(numberOfOutputs),
        });
      }
    }, 0);

    return node;
  }

  addParameter(name, defaultValue) {
    let index = findIndex(this._parameters, param => param.name === name);

    if (index === -1) {
      index = this._parameters.length;
      this._parameters[index] = new AudioWorkerParamDescriptor(name, defaultValue);
    }

    return this._parameters[index];
  }

  removeParameter(name) {
    let index = findIndex(this._parameters, param => param.name === name);

    if (index !== -1) {
      this._parameters.splice(index, 1);
    }
  }
}

module.exports = AudioWorker;
