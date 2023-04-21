import { Link } from "react-router-dom";

import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";

function Error({ error }) {
  return (
    <PageSection>
      <PageTitle>Oops!</PageTitle>
      <PageSubtitle>{error ?? "Sorry, an unexpected error has occurred"}</PageSubtitle>
      

      <div className="mt-4">
        {/* tailwind link button to the home page */}
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded">
          Go Home
        </Link>

      </div>
    
      
    </PageSection>
  )
}

export default Error;
