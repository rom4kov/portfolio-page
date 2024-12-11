import { useContext, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { Project } from "../../contexts/projects.context";

import { Feature } from "../../contexts/projects.context";
import { FlashContext } from "../../contexts/flash.context";

import axios, { AxiosResponse } from "axios";

import { getImageURL } from "../../utils/image-util";

import ViewDetailsSVG from "../../assets/svg/view-details.tsx";
import ExternalLinkSVG from "../../assets/svg/external-link.tsx";

const apiUrl = process.env.REACT_APP_API_URL;

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
      `${apiUrl}/api/delete-project`,
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
    <div className="w-full xl:w-[32.5rem] items-start bg-tokyo-4-300 xl:bg-transparent xl:hover:bg-tokyo-4-300 p-4 xl:p-4 rounded-lg">
      <div className="w-full flex gap-2">
        <div
          className={`flex flex-row justify-between w-full`}
        >
          <h3 className="flex-grow text-left text-sm lg:text-lg font-bold">
            {project.title}
          </h3>
          {setFeatures && (
            <div className="flex flex-none w-8 justify-end scale-75 lg:scale-95 xl:scale-100 translate-x-[8px] xl:translate-x-[-8px] translate-y-[-3px] xl:translate-y-[0]">
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
              onClick={() => { 
                if (project.project_type === "null") {
                  project.project_type = "work";
                }
                handleEditForm(project) 
              }}
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
      <div className="mt-2 w-full xl:flex gap-3 lg:gap-1">
        <img
          src={
            project.img_file_path !== undefined
              ? getImageURL(project.img_file_path)
              : ""
          }
          alt="thumbnail of web site project landing page"
          className="mt-1 me-2 md:me-3 w-[11rem] xl:w-[24%] h-[5.5rem] md:h-[4.75rem] xl:h-full opacity-80 rounded float-left"
        />
        <div
          className="w-full text-start xl:leading-5 hyphens-auto text-pretty project-description"
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
      </div>
      <div className="w-full xl:w-[77.5%] mt-3 xl:ms-[23%] mb-1 xl:ps-5 flex gap-2 flex-wrap">
        {project.keywords.map((keyword, idx) => {
          return (
            <span
              key={idx}
              className="py-[0.15rem] px-[0.5rem] xl:py-1 xl:px-3 bg-tokyo-15-100 text-tokyo-15-500 rounded-xl text-[0.7rem] lg:text-[0.75rem] xl:text-[0.7rem] font-bold"
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
