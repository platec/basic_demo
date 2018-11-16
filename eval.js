var asyncEval = (function() {
  // 回调
  var listeners = [];
  var workerScript = '\
  onmessage = function (e) {\
    postMessage({\
      id: e.data.id,\
      evaluated: eval(e.data.code)\
    });\
  }';
  
  var worker = new Worker('data:text/javascript;charset=US-ASCII,' + workerScript);
  worker.onmessage = function(e) {
    if (listeners[e.data.id]) {
      listeners[e.data.id](e.data.evaluated);
    }
    delete listeners[e.data.id];
  };

  return function(code, callback) {
    listeners.push(callback || null);
    worker.postMessage({
      id: listeners.length - 1,
      code: code
    });
  };
})();