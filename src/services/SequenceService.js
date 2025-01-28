
class SequenceService {
  static properties = {
    sequences: { type: Array },
  }

  // async saveSequence(id, pattern) {
  //   await sequencerDB.patterns.put({ id, pattern });
  // }

  constructor() {
    console.debug("called SequenceService constructor.")

    this.voices_count = 1
    this.steps_count = 16

    this.resetSequences()


  }

  // async loadSequence(id) {
  //   const sequence = await sequencerDB.patterns.get(id);
  //   return sequence ? sequence.pattern : null;
  // }

  // async deleteSequence(id) {
  //   await sequencerDB.patterns.delete(id);
  // }

  // async getAllSequences() {
  //   return await sequencerDB.patterns.toArray();
  // }
  //

  resetSequences() {
    this.sequences = Array.from(
      { length: this.voices_count },
      () => new Array(this.steps_count).fill(false)
    )
  }
}



const instance = new SequenceService()
//Object.freeze(instance);

export default instance

//event: { type: Object }, // Loop, Part, Pattern, Sequence, ToneEvent
