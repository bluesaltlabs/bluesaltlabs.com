//import { sequencerDB } from '@/db/sequencerDB.js';


class SequenceRepository {
    // constructor(dbName) {
    //     this.db = new Dexie(dbName);
    //     this.setupDatabase();
    // }

    setupDatabase() {
        this.db.version(1).stores({
            sequences: '++id, name, data'
        });
    }

    async saveSequence(name, data) {
        try {
            const sequenceId = await this.db.sequences.put({ name, data });
            console.log(`Sequence saved with ID: ${sequenceId}`);
        } catch (error) {
            console.error('Failed to save sequence:', error);
        }
    }

    async loadSequence(id) {
        try {
            const sequence = await this.db.sequences.get(id);
            if (sequence) {
                console.log('Loaded sequence:', sequence);
                return sequence;
            } else {
                console.warn(`No sequence found with ID: ${id}`);
                return null;
            }
        } catch (error) {
            console.error('Failed to load sequence:', error);
            return null;
        }
    }

    async getAllSequences() {
        try {
            const sequences = await this.db.sequences.toArray();
            console.log('Loaded all sequences:', sequences);
            return sequences;
        } catch (error) {
            console.error('Failed to get all sequences:', error);
            return [];
        }
    }
}

const repository = new SequenceRepository()
