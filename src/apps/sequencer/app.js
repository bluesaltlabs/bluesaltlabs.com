import AudioService from '@/services/AudioService';
import background from './background.svg'


/* Sequencer App */
class SequencerApp extends EventTarget {
  constructor() {
    super();
    this.audioStarted = false;
    this.synth = null;

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

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // ???
      console.debug(background);

      // temp: mount the background image
      const mountPoint = document.getElementById('sequencer-app');
      const bg = document.createElement('object');
      bg.type = 'image/svg+xml';
      bg.data = background;
      bg.style.display = 'block';
      bg.style.maxWidth = '100%';
      bg.style.height = 'auto';
      mountPoint.appendChild(bg);

      // ...

      // ...
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
