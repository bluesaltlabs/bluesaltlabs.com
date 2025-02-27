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

  // Initialize a sample player instance for the specified sample key. Creates document event listener.
  initSamplePlayer(sampleKey) {
    console.debug(`triggered initSamplePlayer for ${sampleKey}`)

    document.addEventListener(`sample_${sampleKey}_play`, (e) => {
      console.debug(
        `triggered sample_${sampleKey}_play event`,
        { action: e.detail.action, sampleKey: e.detail.sampleKey, detail: e.detail }
      );
      this.triggerSample(sampleKey);
    });

    // get the url of the sample
    // todo: obviously this shouldn't be hard-coded.
    const sampleUrl = `https://bluesaltlabs.github.io/resources/samples/808/${sampleKey}.wav`;

    this.samplePlayers[sampleKey] = new AudioService.t.Player({
      url: sampleUrl,
      onload: () => {
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.add('active');
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('inactive');
      },
      onended: () => {
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('active');
      }
    }).toDestination();
  }

  triggerSample(sampleKey) {
    // todo: trigger the sample player for the specified key.
    try {
      this.samplePlayers[sampleKey].start();
      // trigger sequencer pad light.


      //this.samplePlayers[sampleKey].onended(() => {
        //document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('active');
        //});

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
      const sqKey = SequencerVectors.getBaseSequencerPadKeyVector(0, col);

      // append key to sequencer container vector
      sv.appendChild(sqKey);
    }

    // Mount the sequencer vector to the app mount point.
    const mountPoint = document.getElementById('sequencer-app');
    mountPoint.appendChild(sv);
  }

  attachTestButtonEventListeners() {
    // loop through each of the buttons in 'test-tone-buttons' container, attach event listeners
    // todo: convert the button click to an event that can be listened to.
    const testButtons = document.querySelectorAll('.test-tone-btn');

    for (let i = 0; i < testButtons.length; i++) {
      const btn = testButtons[i];
      const sampleKey = btn.dataset.sampleKey;

      // Initialize the sample player fo this sampleKey
      this.initSamplePlayer(sampleKey);

      // todo: apparently this is more complicated than just attaching a listener to a button. fine, be that way.
      // Attatch the audio player event.
      btn.addEventListener('click', (e) => {
        const sampleKey = btn.dataset.sampleKey;
        // Fire a new custom event
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_play`, { detail: { sampleKey, action: 'play' } }));
         //console.debug(`clicked button ${btn.id} '${sampleKey}' | ${e.target.dataset.sampleKey}`);

      });

      btn.disabled = false;
    }
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // ???


      // Build the sequencer vectors
      this.buildVectors();

      // ...

      // Set up audio start button
      // todo: move this to a button on the sequencer vector instead.
      const startAudioButton = document.getElementById("btn-start-audio");
      startAudioButton.addEventListener('click', (e) => this.startAudio(e), { once: true });
    });
  }
}

let sequencerApp = new SequencerApp();
