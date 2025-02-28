import AudioService from '@/services/AudioService';
import SequencerVectors from './SequencerVectors';
import { sample_keys } from './constants';


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
      this.attachTestButtonEventListeners(); // temp: this should be combined with the method below
      this.attachTestPlayerControlEventListeners();
    }
    e.target.disabled = true;
    this.audioStarted = true;
  }

  // Initialize a sample player instance for the specified sample key. Creates document event listener.
  initSamplePlayer(sampleKey) {
    console.debug(`triggered initSamplePlayer for ${sampleKey}`)

    // Add event listener for sample play event
    document.addEventListener(`sample_${sampleKey}_play`, (e) => {
      console.debug(`triggered sample_${sampleKey}_play event`, { action: e.detail.action, sampleKey: e.detail.sampleKey, detail: e.detail });
      this.triggerSampleEvent(sampleKey, 'play', e.detail?.value);
    });

    // Add event listener for sample loop event
    document.addEventListener(`sample_${sampleKey}_loop`, (e) => {
      console.debug(`triggered sample_${sampleKey}_loop event`, { action: e.detail.action, sampleKey: e.detail.sampleKey, detail: e.detail });
      this.triggerSampleEvent(sampleKey, 'loop', e.detail?.value);
    });

    // Add event listener for sample reverse event
    document.addEventListener(`sample_${sampleKey}_reverse`, (e) => {
      console.debug(`triggered sample_${sampleKey}_reverse event`, { action: e.detail.action, sampleKey: e.detail.sampleKey, detail: e.detail });
      this.triggerSampleEvent(sampleKey, 'reverse', e.detail?.value);
    });

    // Add event listener for sample volume event
    document.addEventListener(`sample_${sampleKey}_volume`, (e) => {
      console.debug(`triggered sample_${sampleKey}_volume event`, { action: e.detail.action, sampleKey: e.detail.sampleKey, detail: e.detail });
      this.triggerSampleEvent(sampleKey, 'volume', e.detail?.value);
    });

    // get the url of the sample
    // todo: obviously this shouldn't be hard-coded.
    const sampleUrl = `https://bluesaltlabs.github.io/resources/samples/808/${sampleKey}.wav`;

    this.samplePlayers[sampleKey] = new AudioService.t.Player({
      url: sampleUrl,
      onload: () => {
        // console.debug(`samplePlayer ${sampleKey} onload`)
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.add('active');
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('inactive');
      },
      onstop: () => {
        // console.debug(`samplePlayer ${sampleKey}: onstop`)
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('playing');
      }
    }).toDestination();
  }

  triggerSampleEvent(sampleKey, eventKey, value) {
    // todo: trigger the sample player for the specified key.
    if(eventKey === 'play') {
      try {
        // trigger sequencer pad light.
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.add('playing');
      } catch(e) { console.error(e); }

      try {
        // Play the sample
        this.samplePlayers[sampleKey].start()
        // console.debug("samplePlayer", { player: this.samplePlayers[sampleKey] })
      } catch(e) { console.error(e); }

      return;
    }

    if(eventKey === 'loop') {
      try {
        console.debug("triggered loop event", { player: this.samplePlayers[sampleKey] })
        // todo: update this sample to play looped
        this.samplePlayers[sampleKey].loop = !!value;
      } catch(e) { console.error(e); }
      return
    }

    if(eventKey === 'reverse') {
      try {
        console.debug("triggered reverse event", { player: this.samplePlayers[sampleKey] })
        this.samplePlayers[sampleKey].reverse = !!value;
      } catch(e) { console.error(e); }
      return
    }

    if(eventKey === 'volume') {
      try {
        console.debug("triggered volume event", { player: this.samplePlayers[sampleKey], volume: value })

        // Update this sample's volume setting
        this.samplePlayers[sampleKey].volume.value = value;
      } catch(e) { console.error(e); }
      return
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
    for (let col = 0; col < 17; col++) {
      const sqKey = SequencerVectors.getBaseSequencerPadKeyVector(0, col);

      // append key to sequencer container vector
      sv.appendChild(sqKey);
    }

    // Mount the sequencer vector to the app mount point.
    const mountPoint = document.getElementById('sequencer-app');
    mountPoint.innerHTML = ``; // clear the loading animation from the mount point
    mountPoint.appendChild(sv);
  }

  attachTestButtonEventListeners() {
    // loop through each of the buttons in 'test-tone-buttons' container, attach event listeners
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

  attachTestPlayerControlEventListeners() {
    let element;

    // For each of the test sample containers, attach event listeners to elements
    for(let sampleKey of Object.values(sample_keys)) {

      // Attach element loop event listener
      element = document.getElementById(`${sampleKey}_loop`);
      element.disabled = false;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const loop = e.target.checked;

        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_loop`, { detail: { action: 'loop', sampleKey, value: loop } }));
      });

      // Attach element reverse event listener
      element = document.getElementById(`${sampleKey}_reverse`);
      element.disabled = false;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const reverse = e.target.checked;

        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_reverse`, { detail: { action: 'reverse', sampleKey, value: reverse } }));
      });

      // Attach element volume event listener
      element = document.getElementById(`${sampleKey}_volume`);
      element.disabled = false;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const volume = parseInt(e.target.value);


        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_volume`, { detail: { action: 'volume', sampleKey, value: volume } }));
      });

      // Attach element start time event listener
      // Attach element end time event listener
      // Attach element playback rate event listener
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
