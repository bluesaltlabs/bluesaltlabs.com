// todo: convert this to a clas instead.

/* Keyboard App */
class KeyboardDemoApp {
  #foobar = "thing"
  constructor() {
    // public properties go here with
    // this.foo = "bar" // syntax
  }

  handleEvent(event) {
    console.debug("KeyboardDemoApp is handling event", event)

  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // todo: on page load
    });
  }
}


// Load Page App
let kbApp = new KeyboardDemoApp();
kbApp.init()

// -------------------------------------------------------------------------- //
