import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";

import { useLoaderData } from "react-router-dom";

export function journalLoader({ params }) {
  const journalEntries = []; // todo
  
  return {
    journalEntries,
  }
}

function Journal() {
  const { journalEntries } = useLoaderData(journalLoader);

  return (
    <>
      <PageSection>
        <PageTitle>Journal</PageTitle>
        <PageSubtitle></PageSubtitle>
        <PageDescription>Journal Content</PageDescription>

      </PageSection>
    
      <PageSection>
        <pre><code>
          {JSON.stringify(journalEntries, null, 2)}
        </code></pre>
      </PageSection>
    </>
    
  )
}

export default Journal;
