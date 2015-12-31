const fs = require("fs");
const path = require("path");

let _inject = null;

class XMLHttpRequest {
  constructor() {
    this._url = "";
  }

  static get inject() {
    return _inject;
  }

  static set inject(callback) {
    if (callback === null || typeof callback === "function") {
      _inject = callback;
    }
  }

  open(method, url) {
    this._url = url;
  }

  send() {
    let filename = path.resolve(__dirname, this._url);

    fs.readFile(filename, "utf-8", (err, data) => {
      if (typeof _inject === "function") {
        _inject.call(this, err, data);
        return;
      }

      if (err) {
        this.readyState = 4;
        this.status = 404;
        this.statusText = "Not Found";
        this.response = "Not Found";
        if (typeof this.onload === "function") {
          this.onload();
        }
        return;
      }

      this.readyState = 4;
      this.status = 200;
      this.statusText = "OK";
      this.response = `${data}`;
      if (typeof this.onload === "function") {
        this.onload();
      }
    });
  }
}

module.exports = global.XMLHttpRequest = XMLHttpRequest;
