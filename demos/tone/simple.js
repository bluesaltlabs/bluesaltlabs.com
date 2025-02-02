//import * as Tone from "tone";

let simpleToneApp = (() => {
  // Initiate app variables and methods
  let self = {};

  //self.loops = []; // todo
  //self.synths = []; // todo

  self.handleEvent = (event) => {
    console.debug("handling event", event)
  }

  self.playTextareaCode = () => {
    const ta = document.getElementById('ta01')
    const codeVal = ta.value

    console.debug("playTextareaCode", { value: codeVal })

    // todo: make this safer. i.e., only allow it to execute tone.js code. somehow.
    eval(codeVal)
  }

  self.stopTextAreaCode = () => {
    const ta = document.getElementById('ta01')
    const codeVal = ta.value
  }

  self.initAudio = (e) => {
    // init Tone.js
    Tone.start()

    const btnPlay = document.getElementById('btn_play')
    // init play button
    btnPlay.addEventListener('click', self.playTextareaCode)
    btnPlay.disabled = false;
  }

  // return self.
    console.debug("simpleToneApp initiated", self);
    return self;
})(); // note: semicolon is required here!


// Load Page

document.addEventListener("DOMContentLoaded", (event) => {

  // Disable sample buttons. adding the `disabled` property in the HTML isn't working for some reason.
  // todo: this shouldn't be necessary. Not sure what's going on here.
  const sampleBtns = document.querySelectorAll('.sample-button')
  console.debug("sampleBtns",sampleBtns)
  sampleBtns.forEach((b) => { b.disabled = true });

  // Add start button event listener
    const startBtn = document.getElementById('btn_start')
    startBtn.addEventListener('click', simpleToneApp.initAudio)

    // temp: update textarea content
    const sampleCode = `const synth = new Tone.Synth().toDestination();\nsynth.triggerAttackRelease('C4', '8n');`;
    const ta01 = document.getElementById('ta01')
    ta01.value = sampleCode;

});
