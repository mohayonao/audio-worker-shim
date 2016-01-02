var mouseGain = [ 0, 0 ];

onmessage = function(e) {
  mouseGain[0] = e.data.x;
  mouseGain[1] = e.data.y;
};

onaudioprocess = function(e) {
  for (var channel = 0; channel < e.inputs[0].length; channel++) {
    var inputBuffer = e.inputs[0][channel];
    var outputBuffer = e.outputs[0][channel];
    var bufferLength = inputBuffer.length;
    var gain = mouseGain[channel % 2];
    var noise;

    for (var i = 0; i < bufferLength; i++) {
      noise = Math.random();

      if (noise < gain) {
        outputBuffer[i] = inputBuffer[i];
      } else if (noise < gain * gain) {
        outputBuffer[i] = noise - 0.5;
      } else {
        outputBuffer[i] = 0;
      }
    }
  }
};
