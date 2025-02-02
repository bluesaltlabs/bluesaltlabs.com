let toneApp = (() => {
  // Initiate app variables and methods
  let self = {};

  // todo


  self.onLoad = () => {
    console.debug("simpleToneApp ran onLoad", self);
  }
  // return self.
    console.debug("simpleToneApp initiated", self);
    return self;
})();

// Load App
document.addEventListener("DOMContentLoaded", toneApp.onLoad);
