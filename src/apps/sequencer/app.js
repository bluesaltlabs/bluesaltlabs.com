/* Sequencer App */
class SequencerApp extends EventTarget {
  constructor() {
    super();

    //

    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // Initialize the app
    });
  }
}

let sequencerApp = new SequencerApp();
