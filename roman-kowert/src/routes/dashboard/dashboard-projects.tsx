import { useState, useContext, FormEventHandler } from "react";

import axios, { AxiosResponse } from "axios";
import {
  Project,
  ProjectsContext,
  ProjectsContextType,
} from "../../contexts/projects.context";

import { FlashContext } from "../../contexts/flash.context";

import DashboardForm from "../../components/dashboard/dashboard-form.component";
import ProjectPreview from "../../components/dashboard/project.component";

const apiUrl = process.env.REACT_APP_API_URL;

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const initialState = {
  id: 0,
  title: "title",
  keywords: [],
  img_file_path: "image file path",
  url: "website url",
  description: "description",
  features: [],
  project_type: "work"
};

const DashboardProjects = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<Project>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const { projects, setProjects } =
    useContext<ProjectsContextType>(ProjectsContext);
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const isUpdating = textContent.id !== 0;
    const url = isUpdating
      ? `${apiUrl}/api/update-project`
      : `${apiUrl}/api/create-project`;

    const keywords = textContent.keywords.join(",");

    const formData = new FormData();
    formData.append("id", String(textContent.id));
    formData.append("title", textContent.title);
    formData.append("keywords", keywords);
    formData.append("url", textContent.url);
    formData.append("description", description);
    formData.append("project_type", textContent.project_type);

    if (file) {
      formData.append("img_file", file);
    }

    try {
      const response = (await axios.post<AxiosResponse>(
        url,
        formData,
      )) as Result;

      if (response.data.success == true) {
        setProjects((prev) => {
          if (isUpdating) {
            return prev.map((project) =>
              project.id === textContent.id
                ? {
                    id: textContent.id,
                    title: textContent.title,
                    keywords: textContent.keywords,
                    img_file_path: file?.name
                      ? file.name
                      : project.img_file_path,
                    url: textContent.url,
                    description,
                    features: [],
                    project_type: textContent.project_type,
                  }
                : project,
            );
          } else {
            return [
              ...prev,
              {
                id: projects.length + 1,
                title: textContent.title,
                img_file_path: file?.name,
                keywords: textContent.keywords,
                url: textContent.url,
                description,
                features: [],
                project_type: textContent.project_type,
              },
            ];
          }
        });

        setShowEditForm(false);
        setFlash(
          "Project successfully updated.",
          "bg-tokyo-22-500",
          "text-tokyo-21-300",
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error uploading project:", error);
      setShowEditForm(false);
      setFlash(
        "Project could not be updated.",
        "bg-tokyo-24-500",
        "text-tokyo-3-500",
      );
      setShowAlert(true);
    }
  };

  const handleEditForm = (project: Project) => {
    setShowEditForm(true);
    console.log(project.project_type);
    setTextContent(project);
    setDescription(project.description);
  };

  return (
    <div
      id="projects-edit-container"
      className="w-full h-full px-5 flex flex-col items-center gap-3"
    >
      <h2 className="text-2xl mt-3 text-center flex-none">
        Edit Projects Content
      </h2>
      {!showEditForm ? (
        <div className="w-full h-full flex-grow">
          <div
            className="w-full h-[63vh] mt-3 pe-4 flex flex-col items-start gap-5 overflow-auto"
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
