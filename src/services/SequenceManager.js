import { sequencerDB } from '@/db/sequencerDB.js';

class SequenceManager {
  async saveSequence(id, pattern) {
    await sequencerDB.patterns.put({ id, pattern });
  }

  async loadSequence(id) {
    const sequence = await sequencerDB.patterns.get(id);
    return sequence ? sequence.pattern : null;
  }

  async deleteSequence(id) {
    await sequencerDB.patterns.delete(id);
  }

  async getAllSequences() {
    return await sequencerDB.patterns.toArray();
  }
}

const instance = new SequenceManager();
Object.freeze(instance);

export default instance;
