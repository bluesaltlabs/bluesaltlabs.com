import AudioService from '@/services/AudioService';
import SequencerVectors from './SequencerVectors';


/* Sequencer App */
export default class SequencerApp extends EventTarget {
  constructor() {
    super();
    this.audioStarted = false;
    this.samplePlayers = [];

    //

    this.init();
  }

  startAudio(e) {
    if( !this.audioStarted ) {
      AudioService.t.start();
      this.attachTestButtonEventListeners(); // temp
    }
    e.target.disabled = true;
    this.audioStarted = true;
  }

  initSamplePlayer(sampleKey) {
    // create the tone player in this.samplePlayers[]
    // todo: initialize the sample player for the specified key and assign it to this.samplePlayers[sampleKey];
    console.debug(`triggered initSamplePlayer for ${sampleKey}`)

    // get the url of the sample
    const sampleUrl = `https://bluesaltlabs.github.io/resources/samples/808/${sampleKey}.wav`; // todo: obviously this shouldn't be hard-coded.
    console.debug("got sampleUrl:", sampleUrl)

    this.samplePlayers[sampleKey] = new AudioService.t.Player({
      url: sampleUrl
    }).toDestination();
  }

  triggerSample(sampleKey) {
    // todo: trigger the sample player for the specified key.
    try {
      this.samplePlayers[sampleKey].start();
    } catch(e) {
      console.error(e);
    }
  }


  // part of init
  buildVectors() {
    // todo: shouldn't the vectors constructor call all this instead?
    //       to do this, the constructor would need to accept event listener parameters,
    //       or the class itself would need to build them.

    // Build the Sequencer Vector
    const sv = SequencerVectors.getSequencerContainerVector();

    // Add sequencer pad keys
    for (let col = 0; col < 16; col++) {
      const sqKey = SequencerVectors.getBaseSequencerPadKeyVector(6, col);
      //const keyEventListener = this.getKeyEventListener(sqKey, col);

      // Adds event listener to the key
      //sqKey.addEventListener('click', keyEventListener);

      // append key to sequencer container vector
      sv.appendChild(sqKey);
    }

    // todo: more buttons, etc.
    // SequencerVectors.tempGetDemoIconBanner();


    // Mount the sequencer vector to the app mount point.
    const mountPoint = document.getElementById('sequencer-app');
    mountPoint.appendChild(sv);
  }

  attachTestButtonEventListeners() {
    // loop through each of the buttons in 'test-tone-buttons' container, attach event listeners
    const testButtons = document.querySelectorAll('.test-tone-btn');

    for (let i = 0; i < testButtons.length; i++) {
      const btn = testButtons[i];
      const sampleKey = btn.id.split('btn_')[1];

      // Initialize the sample player fo this sampleKey
      this.initSamplePlayer(sampleKey);

      // Attatch the audio player event.
      btn.addEventListener('click', (e) => {
        const sampleKey = e.target.id.split('btn_')[1];
        // console.debug(`clicked button ${btn.id} '${sampleKey}'`);
        this.triggerSample(sampleKey);
      });

      btn.disabled = false;
    }
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // ???


      // Build the sequencer vectors
      //this.buildVectors();

      // ...

      // Set up audio start button
      // todo: move this to a button on the sequencer vector instead.
      const startAudioButton = document.getElementById("btn-start-audio");
      startAudioButton.addEventListener('click', (e) => this.startAudio(e), { once: true });
    });
  }
}

let sequencerApp = new SequencerApp();
