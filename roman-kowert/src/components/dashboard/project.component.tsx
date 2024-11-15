import { useContext, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { Project } from "../../contexts/projects.context";

import { Feature } from "../../contexts/projects.context";
import { FlashContext } from "../../contexts/flash.context";

import axios, { AxiosResponse } from "axios";

import { getImageURL } from "../../utils/image-util";

import ViewDetailsSVG from "../../assets/svg/view-details.tsx";
import ExternalLinkSVG from "../../assets/svg/external-link.tsx";

type ProjectProps = {
  project: Project;
  handleEditForm?: (project: Project) => void;
  setProjects?: Dispatch<SetStateAction<Project[] | []>>;
  setFeatures?: Dispatch<SetStateAction<Feature[] | []>>;
};

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

type deleteFunc = (project_id: number) => Promise<void>;

const ProjectPreview = ({
  project,
  handleEditForm,
  setProjects,
  setFeatures,
}: ProjectProps) => {
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const deleteProject: deleteFunc = async (project_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/delete-project",
      { id: project_id },
    )) as Result;

    if (response.data.success === true && setProjects) {
      setProjects((prev: Project[]) => {
        return prev.filter((project) => project.id !== project_id);
      });
    }

    setFlash(
      "Project has been deleted",
      "bg-tokyo-22-500",
      "text-tokyo-21-300",
    );
    setShowAlert(true);
  };

  const showFeatures = () => {
    if (setFeatures) {
      setFeatures(project.features);
    }
  };

  return (
    <div className="w-[97.5%] items-start hover:bg-tokyo-4-300 p-3 rounded-lg">
      <div className="mt-0 flex gap-2">
        <div className={`${setFeatures && "w-full"} flex justify-between`}>
          <h3 className="font-bold">{project.title}</h3>
          {setFeatures && (
            <div className="flex">
              <Link
                to={String(project.id)}
                className="ms-auto h-6 py-1 leading-[0.9rem] text-xs hover:text-tokyo-15-500 transition-color duration-200"
                onClick={showFeatures}
                title="See Project Details"
              >
                <ViewDetailsSVG />
              </Link>
              <Link
                to={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-auto me-1 h-6 pt-1 px-1 leading-[0.9rem] text-xs hover:text-tokyo-15-500 transition-color duration-200 translate-y-[0.035rem]"
                title="Go to Website"
              >
                <ExternalLinkSVG />
              </Link>
            </div>
          )}
        </div>
        {handleEditForm && (
          <div className="ms-auto">
            <button
              className="me-1 h-6 p-1 leading-[0.9rem] text-xs"
              onClick={() => handleEditForm(project)}
            >
              Edit
            </button>
            <button
              className="me-3 h-6 p-1 leading-[0.9rem] text-xs"
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 flex gap-3">
        <img
          src={
            project.img_file_path !== undefined
              ? getImageURL(project.img_file_path)
              : ""
          }
          alt="thumbnail of web site project landing page"
          className="mt-1 w-[25%] h-full opacity-80 rounded"
        />
        <div
          className="w-[75%] text-start"
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
      </div>
      <div className="mt-3 ms-32 mb-1 ps-3 flex gap-2 flex-wrap">
        {project.keywords.map((keyword, idx) => {
          return (
            <span
              key={idx}
              className="py-1 px-3 bg-tokyo-15-100 text-tokyo-15-500 rounded-xl text-xs font-bold"
            >
              {keyword}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPreview;
