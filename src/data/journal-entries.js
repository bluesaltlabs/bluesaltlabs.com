/*
interface JournalEntry {
  id: number;           // arbitrary unique id. 
  title: string;        // This is used in the meta title tag.
  subtitle: string;     // 
  description: string;  // This is used in the meta description tag.
  slug: string;         // the slug used in the URL. The markdown file name is the same as the slug.
  content: string;      // If no markdown file is found, this is used as the content.
  created_at: string;   // ISO 8601 date string
  published_at: string; // ISO 8601 date string
  is_published:         // boolean;
}
*/

const journalEntries = [
  {
    id: 1,
    title: 'Test Post',
    subtitle: '',
    description: '',
    slug: 'test-post',
    content: 'This is a test post.',
  },
  {
    id: 2,
    title: 'Second Post',
    subtitle: 'Another post to follow the first.',
    description: '',
    slug: 'test-post2',
    content: 'This is a second test post.',
  },
  {
    id: 3,
    title: 'Third Post',
    subtitle: 'Another post to follow the second.',
    description: '',
    slug: 'test-post3',
    content: 'This is a third test post.',
  },
];


export default journalEntries;
