import { Link } from "react-router-dom";

import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";

function NoMatch() {
  return (
    <PageSection>
      <PageTitle>404</PageTitle>
      <PageSubtitle>Page Not Found - Nothing to see here!</PageSubtitle>
      
      <PageDescription>
        <span>The page you are looking for does not exist.</span>

        <div className="mt-4">
          {/* tailwind link button to the home page */}
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded">
            Go Home
          </Link>

        </div>
      </PageDescription>
      
    </PageSection>
  )
}

export default NoMatch;
