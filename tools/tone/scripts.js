//import * as Tone from "tone";


let Tone
let app


// ...

// if (Tone) {
//   const synth = new Tone.Synth().toMaster()
// }

/*
class ToneApp {
  constructor() {
    if (instance) {
      throw new Error("New toneApp instance cannot be created!!");
    }

    instance = this;

    this.loops = []; // todo
    this.synths = []; // todo
  }

  getStartBtn() {
    return document.querySelector(".start-button");
  }

  getSampleBtns() {
    document.querySelectorAll(".sample-button");
  }

  initAudio() {
    //this.t.start()
    Tone.start();
    const buttons = instance.getSampleBtns();
    buttons.forEach((b) => (b.disabled = false));

    startBtn.remove();
  }

  playExample01() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }
  playExample02() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttack("C4", now);
    synth.triggerRelease(now + 1);
  }
  playExample03() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("E4", "8n", now + 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 1);
  }
  playExample04() {
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
  playExample05() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
  }
  playExample06() {
    const player = new Tone.Player(
      "https://tonejs.github.io/audio/berklee/gong_1.mp3",
    ).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
  playExample07() {
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
  playExample08() {
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
  playExample09() {
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
  playExample10() {
    const osc = new Tone.Oscillator().toDestination();
    // start at "C4"
    osc.frequency.value = "C4";
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo("C2", 2);
    // start the oscillator for 2 seconds
    osc.start().stop("+3");
  }

  stopNotes() {
    Tone.getTransport().stop();
  }
}

*/
//let toneAppInstance = Object.freeze(new ToneApp());
//let toneAppInstance = new ToneApp();
//let toneAppInstance = Object.freeze(new StateUtility());


// starting over, based on https://stackoverflow.com/a/4605078/5121100
class ToneApp {
  constructor() {
    this._t = "tone!" // todo: Bind Tone.js here instead of to the page?
  }

  getTone() {
    return this._t
  }

  //introduce() {
    //return `Hi, I'm ${this.name}, and I'm ${this.age} years old.`;
    //}
}

(() => {
  // Create app instance (not sure if I should do this here or outside of this function. )
  app = new ToneApp()

  document.addEventListener("DOMContentLoaded", (event) => {
    // Don't load Tone.js until the button is clicked. Prevents Chrome issues.
    const startBtn = document.getElementById('btn_start')
    startBtn.addEventListener('click', () => {
      // todo: move this to ToneApp.loadTone().
      import('tone').then(module => {
        Tone = module.default
      })
    })

    // output test log statement.
    console.log(app.getTone());

    // todo: get buttons, bind event listeners.


    // ---------------------------------------------------------------------- //
    //Tone.start()

    // Add Start Button event listeners
  //  const startBtn = toneAppInstance.getStartBtn();

    //startBtn.textContent = "Hello From JavaScript";
    //startBtn.addEventListener("click", toneAppInstance.initAudio);

    //const sampleBtns  = toneApp.getSampleBtns()

    //sampleBtns.forEach(b => b.disabled = false)

    //

    // sampleBtns.forEach((b, key) => {
    //   console.debug(window)
    //   console.debug(window['playExample06'])
    // //  b.addEventListener('click', (e) => window.alert(e.target.id))
    // })
  })
})()
