import { useOutletContext } from "react-router-dom";
import { Feature } from "../../contexts/projects.context";
import ProjectFeature from "../../components/dashboard/feature.component";

const ProjectFeatures = () => {
  const [features] = useOutletContext();

  return (
    <div className="w-full h-full bg-red-500">
      {features.map((feature: Feature, idx: number) => {
        return (
          <ProjectFeature
            key={idx}
            feature={feature}
          />
        );
      })}
    </div>
  );
};

export default ProjectFeatures;
