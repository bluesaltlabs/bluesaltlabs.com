import AudioService from '@/services/AudioService';
//import background from './background.svg'


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

  // part of init-buildVectors
  getBaseSequencerKeyVector() {
    // Create the base vector container
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '75');
    svg.setAttribute('height', '120');
    svg.setAttribute('viewBox', '0 0 75 120');
    const keyBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    keyBg.setAttribute('width', '75');
    keyBg.setAttribute('height', '120');
    // keyBg.setAttribute('x', '250');
    // keyBg.setAttribute('y', '10');
    keyBg.setAttribute('rx', '8');
    keyBg.setAttribute('ry', '8');
    keyBg.setAttribute('fill', 'var(--color-blue, #0000ff)');

    // append the key background to the svg container
    svg.appendChild(keyBg);
    return svg;
  }

  // part of init
  buildVectors() {

    // Build the Sequencer Vector
    const sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sv.type = 'image/svg+xml';
    sv.setAttribute('id', 'sequencer-vector');
    sv.setAttribute('width', '1920');
    sv.setAttribute('height', '1080');
    sv.setAttribute('style', 'max-width:100%;height:auto;margin:0auto;display:block;');
    sv.setAttribute('viewBox', `0 0 1920 1080`);


    // Create a background
    const sBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    sBg.setAttribute('width', '1920');
    sBg.setAttribute('height', '1080');
    sBg.setAttribute('rx', '5');
    sBg.setAttribute('ry', '5');
    sBg.setAttribute('fill', 'var(--color-gray-500, #000000)');
    sv.appendChild(sBg);

    // Add sequencer keys
    for (let i = 0; i < 16; i++) {
      const sqKey = this.getBaseSequencerKeyVector();
      sqKey.setAttribute('y', 850);

      sqKey.setAttribute('x', 250 + (i * 100));
      sqKey.setAttribute('fill', 'var(--color-blue, #0000ff)');
      sv.appendChild(sqKey);
    }






    const mountPoint = document.getElementById('sequencer-app');
    mountPoint.appendChild(sv);





  }

  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // ???

      // temp: mount the background images
      this.buildVectors();

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
