import * as Tone from 'tone';
import MusicEnum from '@/enums/MusicEnum.js'

class AudioService {
  // todo: I don't think I need to do this.
  // static properties = {
  //   t: { type: Object },
  //   enums: { type: Object },
  //   isPlaying: { type: Boolean },
  // }

  constructor() {
    console.debug("calling the AudioService constructor")
    if (!AudioService.instance) {
      this.isPlaying = false;
      this.t = Tone;
      this.enums = MusicEnum;
      AudioService.instance = this
    }

    return AudioService.instance;
  }

  // property: isPlaying
  setIsPlaying(isPlaying)  { this.isPlaying = !!isPlaying }
  getIsPlaying()           { return !!this.isPlaying }

  playing(isPlaying = null) {
    if(isPlaying === true || isPlaying === false) {
      this.setIsPlaying(isPlaying)
    }
    return !!this.isPlaying
  }

  togglePlayback(callback = null) {
    this.t.start().then(() => {
      if( this.playing() ) {
        this.t.getTransport().stop()
      } else {
        this.t.getTransport().start()
      }
      this.playing( !this.isPlaying )
      if(typeof callback === 'function') { callback(this.isPlaying) }
    }).catch((error) => {
      console.error('Error starting Tone.js:', error)
    })
  }

  // MusicEnum helper methods
  getEnums() { return MusicEnum }
  getPitches() { return MusicEnum.PITCHES }
  getOctives() { return MusicEnum.OCTIVES }
  countOctives() { return Object.keys(MusicEnum.OCTIVES).length }
  getOctive(index) { return MusicEnum.OCTIVES[index] ?? null }
  getTempos() { return MusicEnum.TEMPOS }
  getOscillators() { return MusicEnum.OSCILLATORS }

  //

}

const instance = new AudioService()
//Object.freeze(instance) // todo: freeze only the t and enums, playing needs to be settable.

export default instance
