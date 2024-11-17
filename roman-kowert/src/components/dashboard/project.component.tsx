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
    <div className="w-[82.5vw] xl:w-[32.5rem] items-start hover:bg-tokyo-4-300 p-4 xl:p-4 rounded-lg">
      <div className="mt-0 w-[82.5vw] xl:w-full flex gap-2">
        <div
          className={`${setFeatures && "w-full"} flex flex-row justify-end w-full xl:w-full`}
        >
          <h3 className="text-start text-sm xl:text-lg w-[75vw] xl:w-[25rem] flex-grow font-bold">
            {project.title}
          </h3>
          {setFeatures && (
            <div className="flex w-8 xl:w-fit justify-end scale-75 xl:scale-100 translate-x-[8px] xl:translate-x-[-8px] translate-y-[-3px] xl:translate-y-[0]">
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
          <div className="mt-1 ms-auto flex">
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
      <div className="mt-2 w-[75vw] xl:w-full xl:flex gap-3">
        <img
          src={
            project.img_file_path !== undefined
              ? getImageURL(project.img_file_path)
              : ""
          }
          alt="thumbnail of web site project landing page"
          className="mt-1 me-2 w-[45vw] xl:w-[24%] h-full opacity-80 rounded float-left xl:float-none"
        />
        <div
          className="w-[75vw] xl:w-[75%] text-start text-xs xl:text-[1rem] xl:leading-5"
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
      </div>
      <div className="w-[75vw] xl:w-[79.5%] mt-3 xl:ms-[24%] mb-1 xl:ps-5 flex gap-2 flex-wrap">
        {project.keywords.map((keyword, idx) => {
          return (
            <span
              key={idx}
              className="py-[0.1rem] px-[0.4rem] xl:py-1 xl:px-3 bg-tokyo-15-100 text-tokyo-15-500 rounded-xl text-[0.6rem] xl:text-[0.7rem] font-bold"
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
