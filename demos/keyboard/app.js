// todo: convert this to a clas instead.

/* Keyboard App */
class KeyboardDemoApp {
  #foobar = "thing"
  constructor() {
    this.app = {};
    //
  }

  #privateMethod() {
    console.debug("This is a private method")
  }


  handleEvent(event) {
    console.debug("KeyboardDemoApp is handling event", event)

  }
  publicMethod() {
      this.#privateMethod()
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      this.handleEvent(new Event(null))
    });
  }
}


/*
let keyboardApp = (() => {
  // Initiate app variables and methods
  let app = {};

  // app.foo = "bar"; // todo
  //

  app.


  return app;
})();
 */


// Load Page App
 let kbApp = new KeyboardDemoApp();
 kbApp.init()
 kbApp.publicMethod()
 kbApp.handleEvent( new Event("outside event") )

 // this throws an error.
 //kbApp.#privateMethod()

//kbApp.handleEvent(new Event("foo event"));

// -------------------------------------------------------------------------- //
