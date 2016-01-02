var bufferLength = 2048;

onnodecreate = function(e) {
  var node = e.node;

  node.buffers = [ new Float32Array(bufferLength), new Float32Array(bufferLength) ];
  node.bufferIndex = 0;
  node.onmessage = function(e) {
    node.buffers = e.data;
    node.bufferIndex = 0;
  };
};

onaudioprocess = function(e) {
  var node = e.node;

  for (var channel = 0; channel < e.inputs[0].length; channel++) {
    var inputBuffer = e.inputs[0][channel];

    e.outputs[0][channel].set(inputBuffer);

    if (node.buffers !== null) {
      node.buffers[channel].set(inputBuffer, node.bufferIndex);
    }
  }

  if (node.buffers !== null) {
    node.bufferIndex += e.inputs[0][0].length;
    if (bufferLength <= node.bufferIndex) {
      node.postMessage(node.buffers, [ node.buffers[0].buffer, node.buffers[1].buffer ]);
      node.buffers = null;
    }
  }
};
