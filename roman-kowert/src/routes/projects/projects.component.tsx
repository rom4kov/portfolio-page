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
    <div
      id="projects-container"
      className="xl:h-[60vh] xl:h-full w-[82vw] xl:w-[35.5rem]"
    >
      <div
        className={`${height} w-full xl:w-[35rem] transition-all relative flex flex-col items-center gap-8 xl:pb-16`}
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
