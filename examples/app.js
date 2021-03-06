var AudioContext = window.AudioContext || window.webkitAudioContext;

(function() {
  var scripts = document.getElementsByTagName("script");

  window.WORKER_PATH = scripts[scripts.length - 1].getAttribute("worker-path") || "";
})();

function readFile(file) {
  return new Promise(function(resolve, reject) {
    var fileReader = new FileReader();

    fileReader.onload = function(e) {
      resolve(e.target.result);
    };
    fileReader.onerror = function(e) {
      reject(e);
    };

    fileReader.readAsArrayBuffer(file);
  });
}

function decodeAudioData(audioContext, audioData) {
  return new Promise(function(resolve, reject) {
    audioContext.decodeAudioData(audioData, resolve, reject);
  });
}

function linlin(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

window.addEventListener("DOMContentLoaded", function() {
  if (!window.WORKER_PATH || !AudioContext) {
    return;
  }
  AudioWorkerShim.polyfill();

  fetch(window.WORKER_PATH).then(function(res) {
    return res.text();
  }).then(function(result) {
    document.getElementById("code").textContent = result;
    prettyPrint();
  }).catch(function(e) {
    console.error(e);
  });

  var audioContext = new AudioContext();
  var workerFactory = null;
  var bufSrc = null;
  var workerNode = null;

  var vue = new Vue({
    el: "#app",
    data: {
      message: "ready...",
      parameters: [],
    },
    methods: {
      change: function() {
        if (workerNode) {
          this.parameters.forEach(function(param) {
            workerNode[param.name].value = param.calc(param.value);
          });
        }
      },
      start(file) {
        start(file);
      },
      stop() {
        stop();
      }
    }
  });

  function repeat(n, ch) {
    var str = "";

    while (0 < n--) {
     str += ch;
    }

    return str;
  }

  function preview(buffers) {
    var amp = Math.abs((buffers[0][0] + buffers[1][0]) * 0.5);

    vue.message = repeat(Math.floor(amp * 80) + 1, "|");
  }

  function start(file) {
    if (workerFactory !== null) {
      if (new Audio().canPlayType(file.type)) {
        vue.message = "loading...";
        readFile(file).then(function(audioData) {
          return decodeAudioData(audioContext, audioData);
        }).then(function(audioBuffer) {
          if (bufSrc !== null) {
            bufSrc.disconnect();
            workerNode.disconnect();
          }
          bufSrc = audioContext.createBufferSource();
          workerNode = workerFactory.createNode(2, 2);

          // recv from capture_worker.js
          workerNode.onmessage = function(e) {
            var buffers = e.data;

            preview(buffers);

            workerNode.postMessage(buffers, [ buffers[0].buffer, buffers[1].buffer ]);
          };

          bufSrc.buffer = audioBuffer;
          bufSrc.onended = stop;
          bufSrc.start(audioContext.currentTime);
          bufSrc.connect(workerNode);

          workerNode.connect(audioContext.destination);

          vue.message = "playing...";
        });
      } else {
        vue.message = "cannot play: '" + file.type + "'";
      }
    }
  }

  function stop() {
    if (bufSrc !== null) {
      bufSrc.disconnect();
      workerNode.disconnect();
    }
    bufSrc = null;
    workerNode = null;
    vue.message = "drag an audio file";
  }

  audioContext.createAudioWorker(window.WORKER_PATH).then(function(factory) {
    workerFactory = factory;
    factory.parameters.forEach(function(param) {
      function calc(value) {
        return linlin(value, 0, 50, 0, param.defaultValue);
      }
      vue.parameters.push({ name: param.name, value: 50, calc: calc });
    });
    window.addEventListener("mousemove", function(e) {
      var x = e.pageX / window.innerWidth;
      var y = e.pageY / window.innerHeight;

      workerFactory.postMessage({ x: x, y : y });
    });
    stop();
  });

  window.addEventListener("dragover", function(e) {
    e.preventDefault();
  });
  window.addEventListener("drop", function(e) {
    e.preventDefault();
    vue.start(e.dataTransfer.files[0]);
  });
});
