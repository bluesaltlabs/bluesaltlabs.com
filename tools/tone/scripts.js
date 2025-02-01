// note: this throws an error with audio context. not sure why
import * as Tone from "tone";

//window.Tone;

let toneApp = (() => {
//  let _t; // Tone.js // todo?

  // Initiate app variables and methods
  let app = {};

  //app.loops = []; // todo
  //app.synths = []; // todo

  app.handleEvent = (event) => {
    console.debug("handling event", event)
  }

  app.initAudio = (e) => {
    // todo: figure out how to make this work.
    // Don't load Tone.js until the button is clicked. Prevents Chrome issues.
    //import('tone').then(module => {
      //window.Tone = module.default
      //console.debug(window.Tone)
      //_t = module.default // todo
    //})
    //_t.start()
    //window.Tone.start() // todo: why doesn't this work?

    // Get Sample Buttons
    const buttons = document.querySelectorAll(".sample-button")

    // bind events to buttons
    buttons[0].addEventListener('click', playExample00)
    buttons[1].addEventListener('click', playExample01)
    buttons[2].addEventListener('click', playExample02)
    buttons[3].addEventListener('click', playExample03)
    buttons[4].addEventListener('click', playExample04)
    buttons[5].addEventListener('click', playExample05)
    buttons[6].addEventListener('click', playExample06)
    buttons[7].addEventListener('click', playExample07)
    buttons[8].addEventListener('click', playExample08)
    buttons[9].addEventListener('click', playExample09)

    // enable buttons
    buttons.forEach((b) => { b.disabled = false });

    // Remove the start button, now that Audio has been initialized.
    e.target.remove();
  }

  // return app.
  console.debug("app initiated", app);
  return app;
})(); // note: semicolon is required here!

// Load Page
(() => {
  // Disable sample buttons. adding the `disabled` property in the HTML isn't working for some reason.
  // todo: this shouldn't be necessary. Not sure what's going on here.
  document.addEventListener("DOMContentLoaded", (event) => {
    // todo Refactor so buttons aren't retrieved twice
    const buttons = document.querySelectorAll(".sample-button")
    buttons.forEach((b) => { b.disabled = true });
  });

  // Add start button event listener
  document.addEventListener("DOMContentLoaded", (event) => {
    const startBtn = document.getElementById('btn_start')
    startBtn.addEventListener('click', toneApp.initAudio)
  })
})(); // note: semicolon is required here!


// todo: refactor these so they're part of app and not seperate like this:
const playExample00 = () => {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C4", "8n");
}

const playExample01 = () => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttack("C4", now);
  synth.triggerRelease(now + 1);
}

const playExample02 = () => {
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();
  synth.triggerAttackRelease("C4", "8n", now);
  synth.triggerAttackRelease("E4", "8n", now + 0.5);
  synth.triggerAttackRelease("G4", "8n", now + 1);
}

const playExample03 = () => {
  // create two monophonic synths
  const synth1 = new Tone.FMSynth().toDestination();
  const synth2 = new Tone.AMSynth().toDestination();
  //play a note every quarter-note
  const loopA = new Tone.Loop((time) => {
    synth1.triggerAttackRelease("C2", "8n", time);
  }, "4n").start(0);
  //play another note every off quarter-note, by starting it "8n"
  const loopB = new Tone.Loop((time) => {
    synth2.triggerAttackRelease("C4", "8n", time);
  }, "4n").start("8n");
  // all loops start when the Transport is started
  Tone.getTransport().start();
  // ramp up to 800 bpm over 10 seconds
  Tone.getTransport().bpm.rampTo(800, 10);
}

const playExample04 = () => {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const now = Tone.now();
  synth.triggerAttack("D4", now);
  synth.triggerAttack("F4", now + 0.5);
  synth.triggerAttack("A4", now + 1);
  synth.triggerAttack("C5", now + 1.5);
  synth.triggerAttack("E5", now + 2);
  synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
}

const playExample05 = () => {
  const player = new Tone.Player(
    "https://tonejs.github.io/audio/berklee/gong_1.mp3",
  ).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}

const playExample06 = () => {
  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
  });
}

const playExample07 = () => {
  const player = new Tone.Player({
    url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
    loop: true,
    autostart: true,
  });
  //create a distortion effect
  const distortion = new Tone.Distortion(0.4).toDestination();
  //connect a player to the distortion
  player.connect(distortion);
}

const playExample08 = () => {
  const player = new Tone.Player({
    url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
    autostart: true,
  });
  const filter = new Tone.Filter(400, "lowpass").toDestination();
  const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

  // connect the player to the feedback delay and filter in parallel
  player.connect(filter);
  player.connect(feedbackDelay);
}

const playExample09 = () => {
  const osc = new Tone.Oscillator().toDestination();
  // start at "C4"
  osc.frequency.value = "C4";
  // ramp to "C2" over 2 seconds
  osc.frequency.rampTo("C2", 2);
  // start the oscillator for 2 seconds
  osc.start().stop("+3");
}
