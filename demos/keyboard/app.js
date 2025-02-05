

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

// keyboard features:
// bind user keyboard (with a toggle switch) such that pressing keys plays the keyboard (like a normal DAW)
//  - ability to turn this on and off
// one octive is one section, create the keyboard as an SVG and duplicate per octive?
//


// Load Page App
let kbApp = new KeyboardDemoApp(1, 4);
kbApp.init()

// -------------------------------------------------------------------------- //

/* code source: https://dev.to/codingcss/playable-piano-using-html-css-and-javascript-5g6c */
let pianoContainer = document.getElementsByClassName("piano-container");

window.onload = () => {

  //24keys

  for (let index = 1; index <= 24; index++) {

    let div = document.createElement("div");

    div.classList.add("key", index <= 10 ? "black-key" : "white-key");

    //For playing audio on click

    const number = index <= 9 ? "0" + index : index;

    div.addEventListener("click", () => {

      //new Audio(${base}key${number}.mp3).play();

    });

    pianoContainer[0].appendChild(div);

  }

};
