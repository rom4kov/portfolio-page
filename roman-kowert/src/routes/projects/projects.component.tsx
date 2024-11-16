import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import {
  ProjectsContext,
  ProjectsContextType,
} from "../../contexts/projects.context";

import { Feature } from "../../contexts/projects.context";

import ProjectPreview from "../../components/dashboard/project.component";

interface ProjectsProps {
  location: string;
}

const Projects: React.FC<ProjectsProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");
  const { projects } = useContext<ProjectsContextType>(ProjectsContext);
  const [projectFeatures, setProjectFeatures] = useState<Feature[] | []>([]);


  useEffect(() => {
    if (location === "/projects") {
      setTimeout(() => {
        setHeight("xl:h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div className="h-[60vh] xl:h-full w-[85vw] xl:w-[35.5rem] overflow-y-scroll" id="projects-container">
      <div
        id="route-container"
        className={`${height} w-[82vw] xl:w-[35rem] transition-all relative flex flex-col items-center gap-8 mb-36`}
      >
        {projects.map((project) => {
          return (
            <ProjectPreview
              key={project.id}
              project={project}
              setFeatures={setProjectFeatures}
            />
          );
        })}
      </div>
      <Outlet context={projectFeatures} />
    </div>
  );
};

export default Projects;
