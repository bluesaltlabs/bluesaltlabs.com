import { Link, Outlet } from "react-router-dom";

import PageSection from "../../components/PageSection";
import PageTitle from "../../components/PageTitle";
import PageSubtitle from "../../components/PageSubtitle";
import PageDescription from "../../components/PageDescription";

function Projects() {

  return (
    <>
      <PageSection>
        <PageTitle>Projects</PageTitle>
        <PageSubtitle></PageSubtitle>
        
        <PageDescription>
          Here are some of the projects I've worked on.
        </PageDescription>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              to="/projects/openeye-website"
              className="block p-4 bg-slate-200/50 hover:bg-slate-200/60 rounded shadow hover:shadow-md hover:dark:shadow-lg"
            >
              OpenEye Website
            </Link>
          </div>
            
          <div>
            <Link
              to="/projects/taylor-study-method"
              className="block p-4 bg-slate-200/50 hover:bg-slate-200/60 rounded shadow hover:shadow-md hover:dark:shadow-lg"
            >
              Taylor Study Method
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <Outlet />
      </PageSection>
    </>
  )
}

export default Projects;
1