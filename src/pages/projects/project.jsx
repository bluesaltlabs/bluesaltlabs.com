
import PageSection from "../../components/PageSection";
import PageTitle from "../../components/PageTitle";
import PageSubtitle from "../../components/PageSubtitle";
import PageDescription from "../../components/PageDescription";
import { useLoaderData } from "react-router-dom";

export function projectLoader({ params }) {
  
  const projectID = params?.id;
  let projects = [];
  /*

  if (projectID) {
    projects = {}
    projects[projectID] = codepenProjects[projectID];
  } else {
    projects = codepenProjects;
  }
  */
  return {
    projectID,
    projects,
  };
}

function Project() {
  const { projectID, project } = useLoaderData(projectLoader);

  return (
    <PageSection>
      <PageTitle>Projects</PageTitle>
      <PageSubtitle></PageSubtitle>
      
      <PageDescription>
        Projects, Projects, Projects!
      </PageDescription>

      {/* Projects Grid */}

    </PageSection>
  )
}

export default Project;
