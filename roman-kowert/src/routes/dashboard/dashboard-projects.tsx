import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Project,
  ProjectsContext,
  ProjectsContextType,
} from "../../contexts/projects.context";
import DashboardForm from "./dashboard-form.component";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardProjects = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [textContent, setTextContent] = useState<Project>({
    id: 0,
    project_id: 0,
    title: "",
    description: "",
  });
  const { projects, setProjects } =
    useContext<ProjectsContextType>(ProjectsContext);
  console.log(projects);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const data = {
      project_id: projects.length + 1,
      title: textContent.title,
      description: description,
    };

    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/update-projects",
      data,
    )) as Result;
    console.log(response.data);

    if (response.data.success == true) {
      setProjects((prev) => {
        return [
          ...prev,
          {
            id: 0,
            project_id: prev.length + 1,
            title: textContent.title,
            description: description,
          },
        ];
      });
    }
  };

  const handleEditForm = (project: Project) => {
    setShowEditForm(true);
    setTextContent(project);
  };

  return (
    <div className="w-full px-5 flex flex-col items-start gap-3">
      <h2 className="text-2xl mt-3">Edit Projects Content</h2>
      {!showEditForm ? (
        <div
          className="w-full h-[58vh] mt-3 flex flex-col items-start gap-5 overflow-auto"
          id="projects-edit-content"
        >
          {projects.map((project) => {
            return (
              <div className="flex gap-3 items-start">
                <div className="text-start">
                  <div>{project.id}</div>
                  <div className="font-bold">{project.title}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: project.description,
                    }}
                  />
                </div>
                <button
                  className="h-6 mt-auto p-1 leading-[0.9rem] text-sm"
                  onClick={() => {
                    handleEditForm(project);
                  }}
                >
                  Edit
                </button>
                <button className="h-6 mt-auto p-1 leading-[0.9rem] text-sm">
                  Delete
                </button>
              </div>
            );
          })}
          <div>
            <button className="h-8 mt-auto p-2 leading-[0.9rem] text-sm">
              Add new project
            </button>
          </div>
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
