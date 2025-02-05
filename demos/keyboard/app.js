
/* Page App */
// todo: figure out how to make this a class instead of creating keyboardApp this way.
// note: This is called an IIFE (Immediately Invoked Function Expression)
let keyboardApp = (() => {
  // Initiate app variables and methods
  let app = {};

  // app.foo = "bar"; // todo
  //

  app.handleEvent = (event) => {
    console.debug("keyboardApp is handling an event", event)
  }

  app.init = () => {
    app.handleEvent(new Event(null))
  }

  return app;
})();

// Load Page
(() => {
  document.addEventListener("DOMContentLoaded", (event) => {
    keyboardApp.init()
  })
})();
