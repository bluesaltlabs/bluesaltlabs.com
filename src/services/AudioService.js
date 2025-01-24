import * as Tone from 'tone';

class AudioService {
  static properties = {
    event: { type: Object }, // Loop, Part, Pattern, Sequence, ToneEvent
    tempo: { type: Number },
    isPlaying: { type: Boolean },
    // todo: others?
  };

  constructor(synth) {
    if (!AudioService.instance) {
      this.event = null;
      this.tempo = 120; // default
      this.isPlaying = false;

      AudioService.instance = this;
    }
    return AudioService.instance;
  }

  startEvent(callback, interval = null) {
    if(interval) {

    }
    if (this.loop) {
      this.loop.dispose();
    }
    this.loop = new Tone.Loop(callback, interval).start(0);
    Tone.getTransport().start();
  }

  set duration(duration) {
    //this.duration = duration;
  }
  get duration() { return this.duration; }

  stopLoop() {
    if (this.loop) {
      this.loop.stop();
      this.loop.dispose();
      this.loop = null;
    }
    Tone.getTransport().stop();
  }

  // todo: this would belong somewhere else.
  triggerSynth(time = Tone.now()) {
    //note, duration = '16n', time = Tone.now()
    //if(tis.note) { set}
    this.synth.triggerAttackRelease(this.note, this.duration, time);
  }
}

// todo: how does this work for modifyhing the AudioManager's internal properties?
const instance = new AudioService();
Object.freeze(instance);

export default instance;
