import * as Tone from 'tone';
import MusicEnum from '@/enums/MusicEnum.js'

class AudioService {
  static properties = {
    t: { type: Object },
    enums: { type: Object },
    isPlaying: { type: Boolean },
  };

  constructor() {
    if (!AudioService.instance) {
      this.isPlaying = false;
      this.t = Tone;
      this.enums = MusicEnum;
      AudioService.instance = this;
    }

    return AudioService.instance;
  }

  // property: isPlaying
  setIsPlaying(isPlaying)  { this.isPlaying = !!isPlaying }
  getIsPlaying()           { return !!this.isPlaying }

  //

  // MusicEnum getters
  getEnums() { return MusicEnum }
  getPitches() { return MusicEnum.PITCHES }
  getOctives() { return MusicEnum.OCTIVES }
  countOctives() { return Object.keys(MusicEnum.OCTIVES).length }
  getOctive(index) { return MusicEnum.OCTIVES[index] ?? null }
  getTempos() { return MusicEnum.TEMPOS }
  getOscillators() { return MusicEnum.OSCILLATORS }
}

const instance = new AudioService();
Object.freeze(instance);

export default instance;
