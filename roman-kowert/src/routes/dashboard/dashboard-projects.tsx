import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Project,
  ProjectsContext,
  ProjectsContextType,
} from "../../contexts/projects.context";
import TextEditor from "../../editor/editor.component";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardProjects = () => {
  const [description, setDescription] = useState<string>("");
  const [textContent, setTextContent] = useState<Project>({
    project_id: 0,
    title: "",
    description: ""
  });
  const { projects, setProjects } = useContext<ProjectsContextType>(ProjectsContext);
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
            project_id: prev.length + 1,
            title: textContent.title,
            description: description,
          },
        ];
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 overflow-scroll">
      <h2 className="text-2xl mt-3">Edit Projects Content</h2>
      {projects.map(project => {
        return (
          <div>{project.title}</div>
        )
      })}
      <form
        action=""
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="title"
          className="p-1 text-sm bg-tokyo-1-500 border rounded-lg w-full"
          placeholder="Title"
          onChange={(evt) => setTextContent((prev) => {
            return {
              ...prev,
              title: evt.target.value
            }
          })}
        />
        <TextEditor
          setTextContent={setDescription}
          initialValue={"Type..."}
        />
        <button type="submit" className="h-8 leading-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default DashboardProjects;
