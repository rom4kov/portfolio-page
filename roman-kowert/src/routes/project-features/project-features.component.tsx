import { useOutletContext } from "react-router-dom";
import { Feature } from "../../contexts/projects.context";
import ProjectFeature from "../../components/dashboard/feature.component";

const ProjectFeatures = () => {
  const projectFeatures: Feature[] = useOutletContext();

  return (
    <div className="mb-36 w-full h-full bg-red-500" id="features-container">
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
