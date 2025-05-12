import { useContext } from "react";
import { Link } from "react-router-dom";

import type { Project, Feature } from "../../contexts/projects.context";
import axios, { AxiosResponse } from "axios";
import { getImageURL } from "../../utils/image-util";
import { ProjectsContext } from "../../contexts/projects.context";
import { FlashContext } from "../../contexts/flash.context";

import GoBackSVG from "../../assets/svg/arrow-go-back";

const apiUrl = process.env.REACT_APP_API_URL;

type deleteFunc = (feature_id: number) => Promise<void>;

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

type FeatureProps = {
  feature: Feature;
  handleEditForm?: (feature: Feature) => void;
  position?: number;
};

const ProjectFeature = ({
  position,
  feature,
  handleEditForm,
}: FeatureProps) => {
  const { setProjects } = useContext(ProjectsContext);
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const deleteFeature: deleteFunc = async (feature_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      `${apiUrl}/api/delete-feature`,
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
    <div key={feature.id} className="mt-3 text-start">
      <div className="mb-1 flex justify-between">
        {feature.title && (
          <div className="flex justify-between w-full">
            <h3
              className={`font-bold block ${position === 0 ? "text-xl -mt-1 mb-2" : "mt-8 mb-0"}`}
            >
              {feature.title}
            </h3>
            {position === 0 && (
              <Link to="/projects" title="Go back to project overview" className="relative bottom-1">
                <GoBackSVG />
              </Link>
            )}
          </div>
        )}
        {handleEditForm && (
          <div className="ms-auto flex">
            <button
              className="me-2 h-6 p-1 leading-[0.9rem] text-xs"
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
        )}
      </div>
      {feature.img_file_path && (
        <img
          className="mb-3 rounded-lg"
          src={getImageURL(feature.img_file_path)}
          alt=""
        />
      )}
      <div
        className="-mb-1 text-sm xl:text-md"
        dangerouslySetInnerHTML={{ __html: feature.description }}
      />
    </div>
  );
};

export default ProjectFeature;
