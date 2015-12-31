class AudioWorkerNodeProcessor {
  constructor() {
    this.__target__ = null;
    this._onmessage = null;
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(callback) {
    if (callback === null || typeof callback === "function") {
      this._onmessage = callback;
    }
  }

  postMessage(message) {
    setTimeout(() => {
      if (this.__target__ && typeof this.__target__.onmessage === "function") {
        this.__target__.onmessage({ data: message });
      }
    }, 0);
  }
}

module.exports = AudioWorkerNodeProcessor;
