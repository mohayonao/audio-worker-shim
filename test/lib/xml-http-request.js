"use strict";

var fs = require("fs");
var path = require("path");

function XMLHttpRequest() {
  this.url = "";
}

XMLHttpRequest.prototype.open = function(method, url) {
  this.url = url;
};

XMLHttpRequest.prototype.send = function() {
  var _this = this;
  var filename = path.resolve(__dirname, this.url);

  fs.readFile(filename, "utf-8", function(err, data) {
    if (err) {
      _this.status = 404;
      _this.statusText = "Not Found";
      _this.response = "Not Found";
      if (typeof _this.onload === "function") {
        _this.onload();
      }
    } else {
      _this.status = 200;
      _this.statusText = "OK";
      if (_this.responseType === "arraybuffer") {
        _this.response = new Uint8Array(data).buffer;
      } else {
        _this.response = data.toString();
      }
      if (typeof _this.onload === "function") {
        _this.onload();
      }
    }
  });
};

global.XMLHttpRequest = XMLHttpRequest;

module.exports = XMLHttpRequest;
