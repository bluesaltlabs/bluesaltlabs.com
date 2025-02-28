import AudioService from '@/services/AudioService';
import SequencerVectors from './SequencerVectors';
import { sample_keys, sample_urls } from './constants';


/* Sequencer App */
class SequencerApp extends EventTarget {
  constructor() {
    super();
    this.audioStarted = false;
    this.isPlaying = false;
    this.players = new AudioService.t.Players({
      //baseUrl: 'https://bluesaltlabs.github.io/resources/samples/808/',
      urls: sample_urls,
      onload: () => { console.debug('players onload'); },
      onstop: () => { console.debug('players onstop'); },
      onerror: (e) => { console.error(`players error`, { e }); }
    }).toDestination();

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

  togglePlayback() {
    AudioService.togglePlayback((isPlaying) => {
      this.isPlaying = !!isPlaying

      //this.isPlaying === true ? this.loop.start(0) : this.loop.stop()
    })
  }

  // Initialize a sample player instance for the specified sample key. Creates document event listener.
  initSamplePlayer(sampleKey) {
    // console.debug(`triggered initSamplePlayer for ${sampleKey}`)
    this.initSampleEventListeners(sampleKey);

    // get the url of the sample
    // todo: obviously this shouldn't be hard-coded.
    const sampleUrl = `${sampleKey}.wav`;

    this.players.add(sampleKey, sampleUrl, () => {
      // todo: enable the button?
    });

    //this.players.player(sampleKey).onstop = () => {
    //  // console.debug("fired onstop for", { sampleKey })
    //  document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('playing');
    //};





    //this.players[sampleKey] = new AudioService.t.Player({
    //  url: sampleUrl,
    //  onload: () => {
    //    // console.debug(`samplePlayer ${sampleKey} onload`);
    //    document.getElementById(`sequencer-pad-${sampleKey}`).classList.add('active');
    //    document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('inactive');

    //    // set sample start time value
    //    document.getElementById(`${sampleKey}_start_time`);
    //    element.value = 0;
    //    element.max = this.players[sampleKey]?.length ?? null;

    //    // set sample end time value
    //    document.getElementById(`${sampleKey}_end_time`);
    //    element.value = this.players[sampleKey]?.length ?? null;
    //    element.max = this.players[sampleKey]?.length ?? null;

    //    console.debug(`samplePlayer ${sampleKey} initialized with time value ${this.players[sampleKey]?.length ?? null}`); // debug


    //  },
    //  onstop: () => {
    //    // console.debug(`samplePlayer ${sampleKey}: onstop`);
    //    document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('playing');
    //  }
    //}).toDestination();
  }

  initSampleEventListeners(sampleKey) {

    // Add event listener for sample play event
    document.addEventListener(`sample_${sampleKey}_play`, (e) => {
      console.debug(`triggered sample_${sampleKey}_play event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'play', e.detail?.value);
    });

    // Add event listener for sample loop event
    document.addEventListener(`sample_${sampleKey}_loop`, (e) => {
      console.debug(`triggered sample_${sampleKey}_loop event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'loop', e.detail?.value);
    });

    // Add event listener for sample reverse event
    document.addEventListener(`sample_${sampleKey}_reverse`, (e) => {
      console.debug(`triggered sample_${sampleKey}_reverse event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'reverse', e.detail?.value);
    });

    // Add event listener for sample volume event
    document.addEventListener(`sample_${sampleKey}_volume`, (e) => {
      console.debug(`triggered sample_${sampleKey}_volume event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'volume', e.detail?.value);
    });

    // Add event listener for sample start_time event
    document.addEventListener(`sample_${sampleKey}_start_time`, (e) => {
      console.debug(`triggered sample_${sampleKey}_start_time event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'start_time', e.detail?.value);
    });

    // Add event listener for sample end_time event
    document.addEventListener(`sample_${sampleKey}_end_time`, (e) => {
      console.debug(`triggered sample_${sampleKey}_end_time event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'end_time', e.detail?.value);
    });

    // Add event listener for sample playback_rate event
    document.addEventListener(`sample_${sampleKey}_playback_rate`, (e) => {
      console.debug(`triggered sample_${sampleKey}_playback_rate event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'playback_rate', e.detail?.value);
    });
  }

  handleSequencerEvent(sampleKey, eventKey, value) {
    // console.debug("handling sequencer event", { sampleKey, eventKey, value }); // debug
    // todo: show a message in some kind of UI element to indicate events firing.
    try {
      if(eventKey === 'play') {
        // trigger sequencer pad light.
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.add('playing');
        // Play the sample
        this.players.player(sampleKey).start();
        return;
      }

      if(eventKey === 'loop') {
        this.players.player(sampleKey).loop = !!value;
        return;
      }

      if(eventKey === 'reverse') {
        this.players.player(sampleKey).reverse = !!value;
        return;
      }

      if(eventKey === 'volume') {
        this.players.player(sampleKey).volume.value = value;
        return;
      }

      if(eventKey === 'start_time') {
        this.players.player(sampleKey).loopStart = value;
        return;
      }

      if(eventKey === 'end_time') {
        this.players.player(sampleKey).loopEnd = value;
      }

      if(eventKey === 'playback_rate') {
        this.players.player(sampleKey).playbackRate = value;
        return;
      }

    } catch(e) { console.error(e); }
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

  // todo: refactor this to loop through the samples, not the buttons available on the page. the UI should not determine how these loops work!!
  attachTestButtonEventListeners() {
    // loop through each of the buttons in 'test-tone-buttons' container, attach event listeners
    const testButtons = document.querySelectorAll('.test-tone-btn');

    for (let i = 0; i < testButtons.length; i++) {
      const btn = testButtons[i];
      const sampleKey = btn.dataset.sampleKey;

      // Initialize the sample player fo this sampleKey
      this.initSamplePlayer(sampleKey);

      // Attatch the audio player event.
      btn.addEventListener('click', (e) => {
        const sampleKey = btn.dataset.sampleKey;
        // Fire a new custom event
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_play`, { detail: { sampleKey, action: 'play' } }));
         //console.debug(`clicked button ${btn.id} '${sampleKey}' | ${e.target.dataset.sampleKey}`);

      });

      //btn.disabled = false;
    }
  }

  attachTestPlayerControlEventListeners() {
    let element;

    // For each of the test sample containers, attach event listeners to elements
    for(let sampleKey of sample_keys) {

      // Attach element loop event listener
      element = document.getElementById(`${sampleKey}_loop`);
      element.value = false;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const loop = e.target.checked;
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_loop`, { detail: { action: 'loop', sampleKey, value: loop } }));
      });
      element.disabled = false;

      // Attach element reverse event listener
      element = document.getElementById(`${sampleKey}_reverse`);
      element.value = false;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const reverse = e.target.checked;
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_reverse`, { detail: { action: 'reverse', sampleKey, value: reverse } }));
      });
      element.disabled = false;

      // Attach element volume event listener
      element = document.getElementById(`${sampleKey}_volume`);
      element.value = 0;
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const volume = parseInt(e.target.value);
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_volume`, { detail: { action: 'volume', sampleKey, value: volume } }));
      });
      element.disabled = false;

      // Attach element start time event listener
      element = document.getElementById(`${sampleKey}_start_time`);
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const startTime = parseFloat(e.target.value);
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_start_time`, { detail: { action: 'start_time', sampleKey, value: startTime } }));
      });
      element.disabled = false;

      // Attach element end time event listener
      element = document.getElementById(`${sampleKey}_end_time`);
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const endTime = parseFloat(e.target.value);
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_end_time`, { detail: { action: 'end_time', sampleKey, value: endTime } }));
      });
      element.disabled = false;

      // Attach element playback rate event listener
      element = document.getElementById(`${sampleKey}_playback_rate`);
      element.addEventListener('change', (e) => {
        const sampleKey = e.target.dataset.sampleKey;
        const playbackRate = parseFloat(e.target.value);
        document.dispatchEvent(new CustomEvent(`sample_${sampleKey}_playback_rate`, { detail: { action: 'playback_rate', sampleKey, value: playbackRate } }));
      });
      element.disabled = false;
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
export default sequencerApp;
