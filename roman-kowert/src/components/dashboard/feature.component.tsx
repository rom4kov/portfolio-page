import { useContext } from "react";
import type {
  Project,
  Feature,
} from "../../contexts/projects.context";
import axios, { AxiosResponse } from "axios";
import { getImageURL } from "../../utils/image-util";
import { ProjectsContext } from "../../contexts/projects.context";
import { FlashContext } from "../../contexts/flash.context";

type deleteFunc = (feature_id: number) => Promise<void>;

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

type FeatureProps = {
  feature: Feature;
  handleEditForm: (feature: Feature) => void;
};

const ProjectFeature = ({ feature, handleEditForm }: FeatureProps) => {
  const { setProjects } = useContext(ProjectsContext);
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const deleteFeature: deleteFunc = async (feature_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/delete-feature",
      { id: feature_id },
    )) as Result;

    if (response.data.success === true) {
      setProjects((prev: Project[]) => {
        return prev.map((project) =>
          project.id === feature.project_id
            ? {
                ...project,
                features: project.features.filter(
                  (feature) => feature.id !== feature_id,
                ),
              }
            : project,
        );
      });

      setFlash(
        "Feature has been deleted",
        "bg-tokyo-22-500",
        "text-tokyo-21-300",
      );
      setShowAlert(true);
    }
  };

  return (
    <div key={feature.id} className="mt-3 mb-8 text-start">
      <div className="mb-1 flex justify-between">
        <h3 className="mb-2 font-bold inline">{feature.title}</h3>
        <div>
          <button
            className="ms-auto me-2 h-6 p-1 leading-[0.9rem] text-xs"
            onClick={() => handleEditForm(feature)}
          >
            Edit
          </button>
          <button
            className="ms-auto h-6 p-1 leading-[0.9rem] text-xs"
            onClick={() => deleteFeature(feature.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {feature.img_file_path && (
        <img className="mb-3" src={getImageURL(feature.img_file_path)} alt="" />
      )}
      <div dangerouslySetInnerHTML={{ __html: feature.description }} />
    </div>
  );
};

export default ProjectFeature;
