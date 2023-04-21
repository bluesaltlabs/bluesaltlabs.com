import { Link, useLoaderData } from "react-router-dom";


import PageSection from "../../components/PageSection";
import PageTitle from "../../components/PageTitle";
import PageSubtitle from "../../components/PageSubtitle";
import PageDescription from "../../components/PageDescription";
import MarkdownAsHtml from "../../components/MarkdownAsHtml";

import journalEntries from '../../data/journalEntries/journalEntries';

export async function journalLoader({ params }) {
  console.debug("fired journalLoader")
  let entries = [];
  

  if (params?.slug) {
    // do nothing
  } else {
    entries = journalEntries;
  }

  return {
    entries
  };
}

function Journal() {
  const { entries } = useLoaderData(journalLoader);
  
  return (
    <>
      <PageSection>
        <PageTitle>Journal</PageTitle>
        <PageSubtitle></PageSubtitle>
        <PageDescription>Journal Content</PageDescription>
      </PageSection>

      <PageSection>
        {/* <pre><code>
          {JSON.stringify(entries, null, 2)}
        </code></pre> */}


        {/* Journal Entry NavLink button */}
        <div className="flex">
          {entries.length > 0 && entries.map((entry, index) => (
            <div key={index} className="flex-grow">

              <Link href={`/journal/${entry.slug}`} className="block m-2 p-1 bg-slate-200/50 hover:bg-slate-200/60 rounded shadow-lg hover:shadow-xl">
                <span className="block text-lg font-bold px-2 pt-1 mb-2">
                  {entry.title}
                </span>
                <span className="block">
                  {entry.subtitle ?? '<no content>'}
                </span>
              </Link>

            </div>
          ))}
        </div>

      </PageSection>
      
    </>
    
  )
}

export default Journal;
