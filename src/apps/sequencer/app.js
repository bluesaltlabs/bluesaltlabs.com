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
    // todo: shouldn't the vectors constructor call all this instead?
    //       to do this, the constructor would need to accept event listener parameters,
    //       or the class itself would need to build them.

    // Build the Sequencer Vector
    const sv = this.vectors.getSequencerContainerVector();

    // Add sequencer pad keys
    // todo: the extra rows are temporary for now. make this look more like an actual TR-808 sequencer
    for(let row = 0; row < 7; row++) {
      for (let col = 0; col < 16; col++) {
        const sqKey = this.vectors.getBaseSequencerPadKeyVector(row, col);

        // todo: add event listeners to key. may need to pass them in?

        // append key to sequencer container vector
        sv.appendChild(sqKey);
      }
    }

    // todo: more buttons, etc.
    this.vectors.tempGetDemoIconBanner();


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
