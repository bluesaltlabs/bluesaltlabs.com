import { Link } from "react-router-dom";

import PageSection from "../layouts/PageSection";

function NoMatch() {
  return (
    <PageSection>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </PageSection>
  )
}

export default NoMatch;
