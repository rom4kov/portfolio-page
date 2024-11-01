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
  img_file_path: "",
  description: "",
};

const DashboardProjects = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<Project>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const { projects, setProjects } =
    useContext<ProjectsContextType>(ProjectsContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const isUpdating = textContent.id !== 0;
    const url = isUpdating
      ? "http://localhost:5000/api/update-project"
      : "http://localhost:5000/api/create-project";

    const formData = new FormData();
    formData.append("id", String(textContent.id));
    formData.append("title", textContent.title);
    formData.append("description", description);

    if (file) {
      formData.append("img_file", file);
    }

    try {
      const response = (await axios.post<AxiosResponse>(url, formData)) as Result;
      console.log(response.data);

      if (response.data.success == true) {
        setProjects((prev) => {
          if (isUpdating) {
            return prev.map((project) =>
              project.id === textContent.id
                ? {
                  ...project,
                  title: textContent.title,
                  img_file_path: response.data.file_path,
                  description,
                }
                : project,
            );
          } else {
            return [
              ...prev,
              {
                id: 0,
                img_file_path: response.data.file_path,
                title: textContent.title,
                description,
              },
            ];
          }
        });
      }
    } catch (error) {
      console.error("Error uploading project:", error);
    }
  };

  const handleEditForm = (project: Project) => {
    setShowEditForm(true);
    setTextContent(project);
  };

  return (
    <div className="w-full h-full px-5 flex flex-col items-center gap-3">
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
                  key={project.id}
                  project={project}
                  handleEditForm={handleEditForm}
                  setProjects={setProjects}
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
          setFile={setFile}
          setDescription={setDescription}
        />
      )}
    </div>
  );
};

export default DashboardProjects;
