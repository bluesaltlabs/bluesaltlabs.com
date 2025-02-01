import * as Tone from "tone";


function initAudio() {
  Tone.start()
  const buttons = document.querySelectorAll(".sample-button")
  //buttons.forEach(b => b.disabled = false)
  const startBtn = document.querySelector(".start-button")
  startBtn.remove()

}
  //let synths = [];
  //let loops = []
  function playExample01() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  }
  function playExample02() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttack("C4", now);
    synth.triggerRelease(now + 1);
  }
  function playExample03() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    synth.triggerAttackRelease("C4", "8n", now);
    synth.triggerAttackRelease("E4", "8n", now + 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 1);
  }
  function playExample04() {
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
  function playExample05() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
  }
  function playExample06() {
    const player = new Tone.Player(
      "https://tonejs.github.io/audio/berklee/gong_1.mp3",
    ).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }
  function playExample07() {
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
  function playExample08() {
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
  function playExample09() {
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
      autostart: true,
    });
    const filter = new Tone.Filter(400, "lowpass").toDestination();
    const feedbackDelay = new Tone.FeedbackDelay(
      0.125,
      0.5,
    ).toDestination();

    // connect the player to the feedback delay and filter in parallel
    player.connect(filter);
    player.connect(feedbackDelay);
  }
  function playExample10() {
    const osc = new Tone.Oscillator().toDestination();
    // start at "C4"
    osc.frequency.value = "C4";
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo("C2", 2);
    // start the oscillator for 2 seconds
    osc.start().stop("+3");
  }


  function stopNotes() {
    Tone.getTransport().stop();
  }

  (() => {
    document.addEventListener("DOMContentLoaded", (event) => {
      // todo: a button needs to do this instead
      Tone.start();
    });
  })();
