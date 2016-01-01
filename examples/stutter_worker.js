function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

addParameter("glitch", 0.000075);

onnodecreate = function(e) {
  e.node.inputs = new Array(e.inputs.length);
  for (var i = 0; i < e.node.inputs.length; i++) {
    e.node.inputs[i] = {
      state: 0,
      loopCounter: 0,
      bufferIndex: 0,
      bufferLength: 0,
      buffer: new Float32Array(8192),
    };
  }
};

onaudioprocess = function(e) {
  for (var channel = 0; channel < e.inputs[0].length; channel++) {
    var inputBuffer = e.inputs[0][channel];
    var outputBuffer = e.outputs[0][channel];
    var bufferLength = inputBuffer.length;
    var loopLength;

    for (var i = 0; i < bufferLength; i++) {
      var params = e.node.inputs[channel];

      if (params.state === 0) {
        if (Math.random() < e.parameters.glitch[i]) {
          params.state = 1;
          params.bufferIndex = 0;
          params.bufferLength = sample([ 64, 64, 128, 128, 512, 512, 1024, 1024, 2048, 2048, 4096, 8192 ]);
          loopLength = sample([ 512, 1024, 2048, 4096, 8192, 16384 ]);
          params.loopCounter = Math.floor(loopLength / params.bufferLength) || 1;
        }
      }

      if (params.state === 1) {
        params.buffer[params.bufferIndex++] = inputBuffer[i];
        if (params.bufferLength <= params.bufferIndex) {
          params.state = 2;
          params.bufferIndex = 0;
        }
      }

      if (params.state === 2) {
        outputBuffer[i] = params.buffer[params.bufferIndex++];

        if (params.bufferLength <= params.bufferIndex) {
          params.bufferIndex = 0;
          params.loopCounter -= 1;
          if (params.loopCounter <= 0) {
            params.state = 0;
          }
        }
      } else {
        outputBuffer[i] = inputBuffer[i];
      }
    }
  }
};
