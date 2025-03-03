

class MetronomeApp extends HTMLElement {
  constructor() {
    super();
    this.audioStarted = false; // todo: may not need this.
    this.isPlaying = false;    // todo: may not need this.
    this.init();
  }


  init() {
    // todo
  }
}

customElements.define('metronome-app', MetronomeApp);
export default MetronomeApp;
