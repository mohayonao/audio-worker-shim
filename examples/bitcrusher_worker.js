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
