# AudioWorkerShim
[![Build Status](http://img.shields.io/travis/mohayonao/audio-worker-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/audio-worker-shim)
[![NPM Version](http://img.shields.io/npm/v/audio-worker-shim.svg?style=flat-square)](https://www.npmjs.org/package/audio-worker-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> AudioWorker compatibility shim for legacy Web Audio API

## Installation

```
$ npm install audio-worker-shim
```

downloads:
- with [AudioWorkerCompiler](https://github.com/mohayonao/audio-worker-compiler)
  - [audio-worker-shim.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim.js) _(554.67kB)_
  - [audio-worker-shim.min.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim.min.js) _(299.70kB)_


- without [AudioWorkerCompiler](https://github.com/mohayonao/audio-worker-compiler)
  - [audio-worker-shim-light.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim-light.js) _(69.00kB)_
  - [audio-worker-shim-light.min.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim-light.min.js) _(30.73kB)_

## Demo
- [bitcrusher_worker.js](http://mohayonao.github.io/audio-worker-shim/examples/bitcrusher.html)
- [stutter_worker.js](http://mohayonao.github.io/audio-worker-shim/examples/stutter.html)
- [mousenoise_worker.js](http://mohayonao.github.io/audio-worker-shim/examples/mousenoise.html)
- [capture_worker.js](http://mohayonao.github.io/audio-worker-shim/examples/capture.html)

## API
### AudioWorkerShim
- `polyfill(): void`

## Example

*Main file javascript*

```js
require("audio-worker-shim").polyfill();

var audioContext = new AudioContext();

audioContext.createAudioWorker("bitcrusher_worker.js").then(function(factory) {
  var bitcrusherNode = factory.createNode(1, 1);

  bitcrusherNode.bits.setValueAtTime(8,0);
  bitcrusherNode.connect(output);

  input.connect(bitcrusherNode);
});
```

*bitcrusher_worker.js*

```js
// Custom parameter - number of bits to crush down to - default 8
this.addParameter("bits", 8);

// Custom parameter - frequency reduction, 0-1, default 0.5
this.addParameter("frequencyReduction", 0.5);

onnodecreate = function(e) {
  e.node.phaser = 0;
  e.node.lastDataValue = 0;
};

onaudioprocess = function(e) {
  for (var channel = 0; channel < e.inputs[0].length; channel++) {
    var inputBuffer = e.inputs[0][channel];
    var outputBuffer = e.outputs[0][channel];
    var bufferLength = inputBuffer.length;
    var bitsArray = e.parameters.bits;
    var frequencyReductionArray = e.parameters.frequencyReduction;

    for (var i = 0; i < bufferLength; i++) {
      var bits = bitsArray ? bitsArray[i] : 8;
      var frequencyReduction = frequencyReductionArray ? frequencyReductionArray[i] : 0.5;
      var step = Math.pow(1 / 2, bits);

      e.node.phaser += frequencyReduction;

      if (e.node.phaser >= 1.0) {
        e.node.phaser -= 1.0;
        e.node.lastDataValue = step * Math.floor(inputBuffer[i] / step + 0.5);
      }

      outputBuffer[i] = e.node.lastDataValue;
    }
  }
};
```

## License

MIT
