
class MeternalyzerService {
  static properties = {
    //t: { type: Object },
  }

  constructor() {
    console.debug("calling the MeternalyzerService constructor")
    if (!MeternalyzerService.instance) {
      // this.isPlaying = false;

      MeternalyzerService.instance = this
    }

    return MeternalyzerService.instance
  }

  //

}

const instance = new MeternalyzerService()
// Object.freeze(instance)

export default instance
