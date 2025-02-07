

/* Keyboard App */
class KeyboardDemoApp {
  #foobar = "thing"
  constructor(octives = 1, firstOctive = 2) {
    // Public Properties
    this.octives    = octives;
    this.firstOctive = firstOctive;

    console.debug("KeyboardDemoApp settings: ", { octives: this.octives, firstOctive: this.firstOctive })
  }

  handleEvent(event) {
    console.debug("KeyboardDemoApp event handler:", event)

  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.handleEvent( new Event("app_load") )
      // todo: on page load
      //
    });
  }
}

// Load Page App
// let kbApp = new KeyboardDemoApp(1, 4);
// kbApp.init()

// -------------------------------------------------------------------------- //
