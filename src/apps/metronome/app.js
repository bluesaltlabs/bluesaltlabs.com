

class MetronomeApp extends HTMLElement {
  constructor() {
    super();
    this.audioStarted = false; // todo: may not need this.
    this.isPlaying = false;    // todo: may not need this.
    this.init();
  }


  init() {
    // todo
    // todo: implement a basic metronome using the AudioService and use what I learn here to build my sequencer app.
  }
}

customElements.define('metronome-app', MetronomeApp);
export default MetronomeApp;
