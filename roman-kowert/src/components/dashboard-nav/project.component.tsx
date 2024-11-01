import { Dispatch, SetStateAction } from "react";

import { Project } from "../../contexts/projects.context";

import axios, { AxiosResponse } from "axios";

import { getImageURL } from "../../utils/image-util";

type ProjectProps = {
  project: Project;
  handleEditForm: (project: Project) => void;
  setProjects: Dispatch<SetStateAction<Project[] | []>>;
};

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

type deleteFunc = (arg0: number) => Promise<void>;

const ProjectPreview = ({
  project,
  handleEditForm,
  setProjects,
}: ProjectProps) => {
  const deleteProject: deleteFunc = async (project_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/delete-project",
      { id: project_id },
    )) as Result;

    if (response.data.success === true) {
      setProjects((prev: Project[]) => {
        return prev.filter((project) => project.id !== project_id);
      });
    }
  };

  return (
    <div className="w-[97.5%] items-start hover:bg-tokyo-4-500 p-3 rounded-lg">
      <div className="mt-0 flex gap-2">
        <div className="font-bold">{project.title}</div>
        <button
          className="ms-auto h-6 p-1 leading-[0.9rem] text-xs"
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
      <div className="mt-2 flex gap-3">
        <img
          src={getImageURL(project.img_file_path)}
          alt=""
          className="mt-1 w-[25%] h-full"
        />
        <div
          className="w-[75%] text-start"
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
      </div>
      <div className="mt-3 ms-32 mb-3 ps-3 flex gap-2 flex-wrap">
        {project.keywords.map((keyword) => {
          return (
            <span className="py-0 px-2 bg-tokyo-8-500 text-[#1f2335] rounded-xl text-xs">
              {keyword}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectPreview;
