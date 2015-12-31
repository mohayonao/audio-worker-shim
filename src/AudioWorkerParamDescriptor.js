class AudioWorkerParamDescriptor {
  constructor(name, defaultValue) {
    this._name = "" + name;
    this._defaultValue = +defaultValue || 0;
  }

  get name() {
    return this._name;
  }

  get defaultValue() {
    return this._defaultValue;
  }
}

module.exports = AudioWorkerParamDescriptor;
