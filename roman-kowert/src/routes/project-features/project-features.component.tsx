import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Feature } from "../../contexts/projects.context";
import ProjectFeature from "../../components/dashboard/feature.component";

const ProjectFeatures = () => {
  const projectFeatures: Feature[] = useOutletContext();
  const [fadedIn, setFadedIn] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setFadedIn(true);
    }, 150);
  }, []);

  return (
    <div className={`${fadedIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} transition-all mb-36 w-full h-full bg-red-500`} id="features-container">
      {projectFeatures.map((feature: Feature, idx: number) => {
        return (
          <ProjectFeature
            key={idx}
            position={idx}
            feature={feature}
          />
        );
      })}
    </div>
  );
};

export default ProjectFeatures;
