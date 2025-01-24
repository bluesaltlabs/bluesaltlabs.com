import Dexie from 'dexie';

// Create a new Dexie database instance
export const sequencerDB = new Dexie('SequencerDatabase');

// Define the database schema
sequencerDB.version(1).stores({
  // The 'patterns' table with 'id' as the primary key
  patterns: '++id, pattern'
});

// Optional: Add some initial data or methods to interact with the database
sequencerDB.on('populate', async () => {
  // This function runs when the database is first created
  // You can add initial data here if needed
  await sequencerDB.patterns.bulkAdd([
    { pattern: Array(16).fill(false) }, // Example pattern
  ]);
});

// Example method to clear all data (useful for development)
export async function clearDatabase() {
  await sequencerDB.delete();
  await sequencerDB.open();
  console.log('Database cleared');
}
