import AudioService from '@/services/AudioService';
import SequencerVectors from './SequencerVectors';


/* Sequencer App */
export default class SequencerApp extends EventTarget {
  constructor() {
    super();
    this.audioStarted = false;
    this.samplers = [];

    //

    this.init();
  }

  getPadSamplePlayer(filepath) {
    // Build tone synth
    return new AudioService.t.Player({
      baseUrl: filepath
    });
  }

  startAudio(e) {
    if( !this.audioStarted ) {
      AudioService.t.start();
      this.buildSamplePadListeners();    // this.s.synth
    }
    e.target.disabled = true;
    this.audioStarted = true;
  }

  buildSamplePadListeners() {

  }

  // todo: attach event listeners and samples to these buttons.
  getKeyEventListener(sqKey, col) {
    let eventListener = () => console.debug(`clicked ${sqKey.id} for ${col}`);
    //this.samplers[col] = this.getPadSamplePlayer();
    //this.getPadSamplePlayer()
    switch(col) {
      case 0: // SAMPLE_808_ACCENT
        //return () => this.getPadSamplePlayer(sample_urls['808_accent']);
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_ACCENT`);
      case 1: // SAMPLE_808_BASS_DRUM
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_BASS_DRUM`);
      case 2: // SAMPLE_808_SNARE_DRUM
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_SNARE_DRUM`);
      case 3: // SAMPLE_808_LOW_TOM
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_LOW_TOM`);
      case 4: // SAMPLE_808_MID_TOM
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_MID_TOM`);
      case 5: // SAMPLE_808_HIGH_TOM
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_HIGH_TOM`);
      case 6: // SAMPLE_808_RIM_SHOT
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_RIM_SHOT`);
      case 7: // SAMPLE_808_HAND_CLAP
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_HAND_CLAP`);
      case 8: // SAMPLE_808_LOW_CONGA
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_LOW_CONGA`);
      case 9: // SAMPLE_808_MID_CONGA
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_MID_CONGA`);
      case 10: // SAMPLE_808_HIGH_CONGA
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_HIGH_CONGA`);
      case 11: // SAMPLE_808_CLAVES
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_CLAVES`);
      case 12: // SAMPLE_808_MARACAS
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_MARACAS`);
      case 13: // SAMPLE_808_COWBELL
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_COWBELL`);
      case 14: // SAMPLE_808_CYMBAL
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_CYMBAL`);
      case 15: // SAMPLE_808_OPEN_HAT
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_OPEN_HAT`);
      case 16: // SAMPLE_808_CLOSED_HAT
        return () => console.debug(`clicked ${sqKey.id} for SAMPLE_808_CLOSED_HAT`);
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
      const keyEventListener = this.getKeyEventListener(sqKey, col);

      // Adds event listener to the key
      sqKey.addEventListener('click', keyEventListener);

      // append key to sequencer container vector
      sv.appendChild(sqKey);
    }

    // todo: more buttons, etc.
    // SequencerVectors.tempGetDemoIconBanner();


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
