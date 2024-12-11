import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import {
  Project,
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
  const work_projects: Project[] = projects.filter((obj) => {
    return obj.project_type === "work";
  });
  const personal_projects: Project[] = projects.filter((obj) => {
    return obj.project_type === "project";
  });
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
      className="xl:h-[60vh] xl:h-full w-[82vw] md:w-full xl:w-[35.5rem]"
    >
      <div
        className={`${height} w-full xl:w-[35rem] transition-all relative flex flex-col items-start gap-8 xl:pb-16`}
      >
        <h3 className="mt-1 xl:ms-4 -mb-6 text-xl text-end text-[#ffffffb5] font-bold">
          WORK EXPERIENCE
        </h3>
        <hr className="text-tokyo-15-500 w-full xl:w-[30.5rem] xl:ms-4"/>
        {work_projects.map((project) => {
          return (
            <ProjectPreview
              key={project.id}
              project={project}
              setFeatures={setProjectFeatures}
            />
          );
        })}
        <h3 className="mt-8 xl:ms-4 -mb-6 text-xl text-start text-[#ffffffb5] font-bold">
          PERSONAL PROJECTS
        </h3>
        <hr className="text-tokyo-15-500 w-full xl:w-[30.5rem] xl:ms-4"/>
        {personal_projects.map((project) => {
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
