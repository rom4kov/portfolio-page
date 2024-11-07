import type { Feature as ProjectFeature } from "../../contexts/projects.context";
import { getImageURL } from "../../utils/image-util";

type FeatureProps = {
  feature: ProjectFeature;
  handleEditForm: (feature: ProjectFeature) => void;
}

const ProjectFeature = ({ feature, handleEditForm }: FeatureProps) => {
  return (
    <div key={feature.id} className="mt-3 mb-8 text-start">
      <div className="flex justify-between">
        <h3 className="mb-2 font-bold inline">{feature.title}</h3>
        <button
          className="ms-auto h-6 p-1 leading-[0.9rem] text-xs"
          onClick={() => handleEditForm(feature)}
        >
          Edit
        </button>
      </div>
      {feature.img_file_path && (
        <img className="mb-3" src={getImageURL(feature.img_file_path)} alt="" />
      )}
      <div dangerouslySetInnerHTML={{ __html: feature.description }} />
    </div>
  );
};

export default ProjectFeature;
