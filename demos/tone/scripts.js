import * as Tone from "tone";
// todo: this throws an error with audio context.  fix this. instanciate Tone within the app?
//
// todo: update this so examples use .loops and .synths
//       the idea is to set it up so all sounds can be killed with one button by looping through these arrays.

let toneApp = (() => {
  // Initiate app variables and methods
  let app = {};

  //app.loops = []; // todo
  //app.synths = []; // todo

  app.handleEvent = (event) => {
    console.debug("handling event", event)
  }

  app.getSampleButtons = () => {
    return document.querySelectorAll(".sample-button")
  }

  app.initAudio = (e) => {
    // init Tone.js
    Tone.start()

    // Get Sample Buttons
    const buttons = app.getSampleButtons()

    // bind events to buttons
    buttons[0].addEventListener('click', examples.sample00)
    buttons[1].addEventListener('click', examples.sample01)
    buttons[2].addEventListener('click', examples.sample02)
    buttons[3].addEventListener('click', examples.sample03)
    buttons[4].addEventListener('click', examples.sample04)
    buttons[5].addEventListener('click', examples.sample05)
    buttons[6].addEventListener('click', examples.sample06)
    buttons[7].addEventListener('click', examples.sample07)
    buttons[8].addEventListener('click', examples.sample08)
    buttons[9].addEventListener('click', examples.sample09)
    buttons[10].addEventListener('click', examples.playTextareaCode)

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
    const buttons = toneApp.getSampleButtons()
    buttons.forEach((b) => { b.disabled = true });

    // temp: update textarea content
    const sampleCode = `const synth = new Tone.Synth().toDestination();\nsynth.triggerAttackRelease('C4', '8n');`;
    const ta01 = document.getElementById('ta01')
    ta01.value = sampleCode;
  });

  // Add start button event listener
  document.addEventListener("DOMContentLoaded", (event) => {
    const startBtn = document.getElementById('btn_start')
    startBtn.addEventListener('click', toneApp.initAudio)
  })
})(); // note: semicolon is required here!

const examples = {
  sample00: () => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  },
  sample01: () => {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttack("C4", now);
    synth.triggerRelease(now + 1);
  },
  sample02: () => {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("E4", "8n", now + 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 1);
  },
  sample03: () => {
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
  },
  sample04: () => {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
  },
  sample05: () => {
    const player = new Tone.Player(
      "https://tonejs.github.io/audio/berklee/gong_1.mp3",
    ).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  },
  sample06: () => {
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
  },
  sample07: () => {
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
      loop: true,
      autostart: true,
    });
    //create a distortion effect
    const distortion = new Tone.Distortion(0.4).toDestination();
    //connect a player to the distortion
    player.connect(distortion);
  },
  sample08: () => {
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
      autostart: true,
    });
    const filter = new Tone.Filter(400, "lowpass").toDestination();
    const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

    // connect the player to the feedback delay and filter in parallel
    player.connect(filter);
    player.connect(feedbackDelay);
  },
  sample09: () => {
    const osc = new Tone.Oscillator().toDestination();
    // start at "C4"
    osc.frequency.value = "C4";
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo("C2", 2);
    // start the oscillator for 2 seconds
    osc.start().stop("+3");
  },
  // sample010: () => { },


  playTextareaCode: () => {
    const ta = document.getElementById('ta01')
    const codeVal = ta.value

    console.debug("playTextareaCode", { value: codeVal })

    // todo: make this safer. i.e., only allow it to execute tone.js code. somehow.
    eval(codeVal)
  },
  stopTextAreaCode: () => {
    const ta = document.getElementById('ta01')
    const codeVal = ta.value
  }
}
