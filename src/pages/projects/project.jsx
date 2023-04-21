
import { Outlet } from "react-router-dom";

function Project({ title, subtitle, description }) {
  

  return (
    <>
      {/* Project Header */}
      <PageSection>

        <PageTitle>{title}</PageTitle>
        <PageSubtitle>{subtitle}</PageSubtitle>
        <PageDescription>{description}</PageDescription>
        <BackNavButton to="/projects">
            <ArrowLeftOnRectangleIcon width={16} className="inline-block mr-2" />
            <span>All Projects</span>
          </BackNavButton>
        
      </PageSection>  

      {/* Entry Markdown Content */}
      
    </>
  )
}

export default Project;
