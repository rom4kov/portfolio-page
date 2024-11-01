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

const ProjectPreview = ({ project, handleEditForm, setProjects }: ProjectProps) => {
  const deleteProject: deleteFunc = async (project_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/delete-project",
      { id: project_id },
    )) as Result;

    if (response.data.success === true) {
      setProjects((prev: Project[]) => {
        return prev.filter(project => project.id !== project_id);
      })
    }
  };

  return (
    <div className="flex gap-3 items-start hover:bg-tokyo-4-500 p-3 rounded-lg">
      <div className="text-start">
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
            className="mt-1 w-24 h-full"
          />
          <div
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
