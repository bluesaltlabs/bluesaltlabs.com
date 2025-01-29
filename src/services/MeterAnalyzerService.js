
class MeterAnalyzerService {
  static properties = {
    //t: { type: Object },
  }

  constructor() {
    console.debug("calling the MeterAnalyzerService constructor")
    if (!MeterAnalyzerService.instance) {
      // this.isPlaying = false;

      MeterAnalyzerService.instance = this
    }

    return MeterAnalyzerService.instance
  }

  //

}

const instance = new MeterAnalyzerService()
// Object.freeze(instance)

export default instance
