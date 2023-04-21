
import PageSection from "../components/PageSection";
import PageTitle from "../components/PageTitle";
import PageSubtitle from "../components/PageSubtitle";
import PageDescription from "../components/PageDescription";
import { useLoaderData } from "react-router-dom";

export function projectsLoader({ params }) {
  
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

function Projects() {
  const { projectID, projects } = useLoaderData(projectsLoader);

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

export default Projects;
