function loadScript(scriptURL) {
  return new Promise((resolve, reject) => {
    let xhr = new global.XMLHttpRequest();

    xhr.open("GET", scriptURL);

    xhr.onload = () => {
      /* istanbul ignore else */
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    xhr.onerror = () => {
      reject(new Error(xhr.statusText));
    };

    xhr.send();
  });
}

module.exports = loadScript;
