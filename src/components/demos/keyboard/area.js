

/* Keyboard App */
class KeyboardAreaApp {
  #foobar = "thing"
  constructor(octives = 1, firstOctive = 2) {
    // Public Properties
    this.octives    = octives;
    this.firstOctive = firstOctive;

    console.debug("KeyboardAreaApp settings: ", { octives: this.octives, firstOctive: this.firstOctive })
  }

  handleEvent(event) {
    console.debug("KeyboardAreaApp event handler:", event)

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
// let kbArea = new KeyboardAreaApp(1, 4);
// kbArea.init()

// -------------------------------------------------------------------------- //
