try {
  console.info("js.js successfuly loaded");
} catch (ex) {
  console.info("js.js failed", ex);
}

window.jsLib = (function() {
  function addEvent(target, evt, fn, passive, capture) {
    passive = !!passive;
    capture = !!capture;
    if (target.addEventListener) {
      try {
        target.addEventListener(evt, fn, {
          passive: passive,
          capture: capture
        }); // chrome 51+
      } catch (e) {
        if (passive || capture) {
          console.info(e);
        }
        target.addEventListener(evt, fn, true);
      }
    } else if (target.attachEvent) {
      target.attachEvent('on' + evt, function(evt_) {
        fn.call(target, evt_);
      });
    } else if (!target['on' + evt]) {
      target['on' + evt] = function handler(evt_) {
        fn.call(target, evt_);
      };
    }
  }

  return {
    addEvent: addEvent
  };
})();
