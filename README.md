# AudioWorkerShim
[![Build Status](http://img.shields.io/travis/mohayonao/audio-worker-shim.svg?style=flat-square)](https://travis-ci.org/mohayonao/audio-worker-shim)
[![NPM Version](http://img.shields.io/npm/v/audio-worker-shim.svg?style=flat-square)](https://www.npmjs.org/package/audio-worker-shim)
[![Bower](http://img.shields.io/bower/v/audio-worker-shim.svg?style=flat-square)](http://bower.io/search/?q=audio-worker-shim)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> AudioWorker compatibility shim for legacy Web Audio API

http://webaudio.github.io/web-audio-api/#the-audioworker

## Native API supports
|                      | Support |
| -------------------- |:-------:|
| Google Chrome 41     | :x:     |
| Firefox 36           | :x:     |
| Safari 8             | :x:     |
| Opera 27             | :x:     |
| iOS 8                | :x:     |

## Installation

npm:

```
npm install audio-worker-shim
```

bower:

```
bower install audio-worker-shim
```

downloads:

- [audio-worker-shim.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim.js)
- [audio-worker-shim.min.js](https://raw.githubusercontent.com/mohayonao/audio-worker-shim/master/build/audio-worker-shim.min.js)

## API
### AudioContext
#### Instance Methods
- `createAudioWorker(scriptURL, numberOfInputChannels, numberOfOutputChannels): AudioNode as AudioWorkerNode`

## Example
http://mohayonao.github.io/audio-worker-shim/

## Dependencies
[![Dependency Status](http://img.shields.io/david/mohayonao/audio-worker-shim.svg?style=flat-square)](https://david-dm.org/mohayonao/audio-worker-shim)

- [mohayonao/audio-worker-node](https://github.com/mohayonao/audio-worker-node)
  - AudioWorkerNode for legacy Web Audio API

## License
MIT
