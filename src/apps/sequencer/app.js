// import AudioService from '@/services/AudioService';
import SequencerVectors from './SequencerVectors';
//import background from './background.svg'

/* Sequencer App */
export default class SequencerApp extends EventTarget {
  constructor() {
    super();
    this.audioStarted = false;
    this.synth = null;
    this.vectors = new SequencerVectors();

    //

    this.init();
  }

  buildSynthState() {
    // Build tone synth
    // const synth = new AudioService.t.Synth({});

  }

  startAudio(e) {
    if( !this.audioStarted ) {
      //AudioService.t.start();
      //this.buildSynthState();    // this.s.synth
    }
    e.target.disabled = true;
    this.audioStarted = true;
  }



  // part of init
  buildVectors() {
    // Build the Sequencer Vector
    const sv = this.vectors.getSequencerContainerVector();

    // Add sequencer pad keys
    for (let i = 0; i < 16; i++) {
      const sqKey = this.vectors.getBaseSequencerPadKeyVector(i);

      // todo: add event listeners to key. may need to pass them in?

      // append key to sequencer container vector
      sv.appendChild(sqKey);
    }

    // Mount the sequencer vector to the app mount point.
    const mountPoint = document.getElementById('sequencer-app');
    mountPoint.appendChild(sv);
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


// Notes
/*
# 808 Instruments

listen to them: <https://www.youtube.com/watch?v=gsZ7izQpywY>

- accent
- bass drum
- snare drum
- low tom
- low conga
- mid tom
- mid conga
- hi tom
- hi conga
- rim shot
- claves
- hand clap
- maracas
- cow bell
- cymbal
- open hi-hat
- closed hi-hat

16 steps


*/
