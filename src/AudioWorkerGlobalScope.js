class AudioWorkerGlobalScope {
  constructor(sampleRate) {
    this.__target__ = null;
    this._sampleRate = sampleRate;
    this._onmessage = null;
    this._onaudioprocess = null;
    this._onnodecreate = null;
  }

  get sampleRate() {
    return this._sampleRate;
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(callback) {
    if (callback === null || typeof callback === "function") {
      this._onmessage = callback;
    }
  }

  get onaudioprocess() {
    return this._onaudioprocess;
  }

  set onaudioprocess(callback) {
    if (callback === null || typeof callback === "function") {
      this._onaudioprocess = callback;
    }
  }

  get onnodecreate() {
    return this._onnodecreate;
  }

  set onnodecreate(callback) {
    if (callback === null || typeof callback === "function") {
      this._onnodecreate = callback;
    }
  }

  get parameters() {
    return this.__target__ ? this.__target__.parameters : [];
  }

  postMessage(message) {
    setTimeout(() => {
      if (this.__target__ && typeof this.__target__.onmessage === "function") {
        this.__target__.onmessage({ data: message });
      }
    }, 0);
  }

  close() {}

  addParameter(name, defaultValue) {
    if (this.__target__) {
      return this.__target__.addParameter(name, defaultValue);
    }
  }

  removeParameter(name) {
    if (this.__target__) {
      return this.__target__.removeParameter(name);
    }
  }
}

module.exports = AudioWorkerGlobalScope;
