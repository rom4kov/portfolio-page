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
        setHeight("h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  useEffect(() => {
    const firstH3 = document.querySelector("h3");
    console.log(firstH3);
    if (firstH3) {
      firstH3.setAttribute("style", "font-size:1.85rem !important");
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div
        className="fixed bottom-0 h-full inset-0 bg-gradient-to-b from-transparent from-40% to-[#1f2335] to-90% pointer-events-none z-10"
        style={{ top: "80%", height: "20%", left: "50%", width: "40%" }}
      ></div>
      <div
        id="route-container"
        className={`${height} transition-all relative flex flex-col items-center gap-8 z-10 mb-36 z-0`}
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
