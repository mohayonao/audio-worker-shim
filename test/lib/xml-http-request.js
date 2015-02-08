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
      if (typeof _this.onerror === "function") {
        _this.onerror(err);
      }
    } else {
      if (typeof _this.onload === "function") {
        _this.response = data;
        _this.onload();
      }
    }
  });
};

global.XMLHttpRequest = XMLHttpRequest;

module.exports = XMLHttpRequest;
