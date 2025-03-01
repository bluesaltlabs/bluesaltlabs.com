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

  initSampleEventListeners(sampleKey) {

    // Add event listener for sample play event
    document.addEventListener(`sample_${sampleKey}_play`, (e) => {
      console.debug(`triggered sample_${sampleKey}_play event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'play', e.detail?.value ?? false);
    });

    // Add event listener for sample stop event
    document.addEventListener(`sample_${sampleKey}_stop`, (e) => {
      console.debug(`triggered sample_${sampleKey}_stop event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'stop', e.detail?.value ?? false);
    });

    // Add event listener for sample loop event
    document.addEventListener(`sample_${sampleKey}_loop`, (e) => {
      console.debug(`triggered sample_${sampleKey}_loop event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'loop', e.detail?.value ?? false);
    });

    // Add event listener for sample reverse event
    document.addEventListener(`sample_${sampleKey}_reverse`, (e) => {
      console.debug(`triggered sample_${sampleKey}_reverse event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'reverse', e.detail?.value ?? false);
    });

    // Add event listener for sample volume event
    document.addEventListener(`sample_${sampleKey}_volume`, (e) => {
      console.debug(`triggered sample_${sampleKey}_volume event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'volume', e.detail?.value ?? 0);
    });

    // Add event listener for sample start_time event
    document.addEventListener(`sample_${sampleKey}_start_time`, (e) => {
      console.debug(`triggered sample_${sampleKey}_start_time event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'start_time', e.detail?.value ?? 0);
    });

    // Add event listener for sample end_time event
    document.addEventListener(`sample_${sampleKey}_end_time`, (e) => {
      console.debug(`triggered sample_${sampleKey}_end_time event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'end_time', e.detail?.value ?? null);
    });

    // Add event listener for sample playback_rate event
    document.addEventListener(`sample_${sampleKey}_playback_rate`, (e) => {
      console.debug(`triggered sample_${sampleKey}_playback_rate event`, { ...e?.detail ?? {} });
      this.handleSequencerEvent(sampleKey, 'playback_rate', e.detail?.value ?? 1);
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

      if(eventKey === 'stop') {
        // trigger sequencer pad light.
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('playing');
        // Stop the sample
        this.players.player(sampleKey).stop();
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

  attachTestPlayerControlEventListeners() {
    for(let sampleKey of sample_keys) {
      this.initSampleEventListeners(sampleKey);

      this.players.player(sampleKey).onstop = () => {
        // todo: don't fire stop event because that would create a loop. but something should fire the event.
        document.getElementById(`sequencer-pad-${sampleKey}`).classList.remove('playing');
      };
    }
  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // ???

      // Build the sequencer vectors
      this.buildVectors();

      // ...

      // Set up audio start button
      const startAudioButton = document.getElementById("btn-start-audio");
      startAudioButton.addEventListener('click', (e) => this.startAudio(e), { once: true });
    });
  }
}

let sequencerApp = new SequencerApp();
export default sequencerApp;
