import { useState, useContext, FormEventHandler } from "react";

import axios, { AxiosResponse } from "axios";
import {
  Project,
  ProjectsContext,
  ProjectsContextType,
} from "../../contexts/projects.context";

import DashboardForm from "./dashboard-form.component";
import ProjectPreview from "../../components/dashboard-nav/project.component";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const initialState = {
  id: 0,
  title: "",
  description: "",
};

const DashboardProjects = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<Project>(initialState);
  const [description, setDescription] = useState<string>("");
  const { projects, setProjects } =
    useContext<ProjectsContextType>(ProjectsContext);
  console.log(projects);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const isUpdating = textContent.id !== 0;
    const url = isUpdating
      ? "http://localhost:5000/api/update-project"
      : "http://localhost:5000/api/create-project";

    const data = {
      id: textContent.id,
      title: textContent.title,
      description: description,
    };

    const response = (await axios.post<AxiosResponse>(url, data)) as Result;
    console.log(response.data);

    if (response.data.success == true) {
      setProjects((prev) => {
        if (isUpdating) {
          return prev.map((project) =>
            project.id === textContent.id
              ? { ...project, title: data.title, description: data.description }
              : project,
          );
        } else {
          return [
            ...prev,
            {
              id: 0,
              title: textContent.title,
              description: description,
            },
          ];
        }
      });
    }
  };

  const handleEditForm = (project: Project) => {
    setShowEditForm(true);
    setTextContent(project);
  };

  return (
    <div className="w-full px-5 flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3 text-center">Edit Projects Content</h2>
      {!showEditForm ? (
        <div className="w-full h-full">
          <div
            className="w-full h-[63vh] mt-3 flex flex-col items-start gap-5 overflow-auto"
            id="projects-edit-content"
          >
            {projects.map((project) => {
              return (
                <ProjectPreview
                  project={project}
                  handleEditForm={handleEditForm}
                />
              );
            })}
          </div>
          <button
            className="h-8 mt-8 p-2 leading-[0.9rem] text-sm"
            onClick={() => handleEditForm(initialState)}
          >
            Add new project
          </button>
        </div>
      ) : (
        <DashboardForm
          handleSubmit={handleSubmit}
          setShowEditForm={setShowEditForm}
          textContent={textContent}
          setTextContent={setTextContent}
          setDescription={setDescription}
        />
      )}
    </div>
  );
};

export default DashboardProjects;
