import { useLoaderData } from "react-router-dom";
import { filter, first } from "lodash";

import PageTitle from "../../components/PageTitle";
import PageSubtitle from "../../components/PageSubtitle";
import PageDescription from "../../components/PageDescription";
import PageSection from "../../components/PageSection";

import BackNavButton from "../../components/BackNavButton";
import {
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'


import journalEntries from '../../data/journalEntries/journalEntries';
import MarkdownAsHtml from "../../components/MarkdownAsHtml";


export async function journalEntryLoader({ params }) {
  const entrySlug = params?.slug;
  let entryMarkdown = '';
  let entry = {};  
  
  // attempt to retrieve journal entry from journalEntries
  try {
    entry = first(filter((journalEntries ?? {}), { slug: entrySlug }));
  } catch (error) {
    console.error(error)
  }  

  // throw error if entry not found. 
  // todo: shouldn't this go back to the journal page instead of throwing an error?
  if (!entry) {
    throw new Response(`Journal Entry '${params?.slug}' Not Found`, { status: 404 });
  }

  const getMarkdown = async (slug) => {
    const res = await import(`../../data/journalEntries/${slug}.md?raw`);
    return res?.default;
  }

  // retrieve markdown from markdown file (if it exists)
  try {
    entryMarkdown = entrySlug ? await getMarkdown(entrySlug) : null;
  } catch (error) {
    //console.error(error);
    entryMarkdown = null;
  }

  return {
    id: entry?.id,
    slug: entry?.slug,
    title: entry?.title,
    subtitle: entry?.subtitle,
    description: entry?.description,
    content: entryMarkdown ?? entry?.content ?? "No Content",
  }
}

function JournalEntry() {
  const { id, slug, title, subtitle, description, content } = useLoaderData(journalEntryLoader);

  return (
    <>
      {/* Entry Header */}
      <PageSection>

        <PageTitle>{title}</PageTitle>
        <PageSubtitle>{subtitle}</PageSubtitle>
        <PageDescription>{description}</PageDescription>
        <BackNavButton to="/journal">
            <ArrowLeftOnRectangleIcon width={16} className="inline-block mr-2" />
            <span>All Journal Entries</span>
          </BackNavButton>
        
      </PageSection>  

      {/* Entry Markdown Content */}
      <PageSection>
        <MarkdownAsHtml
          markdown={content}
        />
      </PageSection>
    </>
  )
}

export default JournalEntry;
