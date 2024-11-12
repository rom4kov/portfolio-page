import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  FormEventHandler,
  ChangeEvent,
} from "react";

import axios, { AxiosResponse, AxiosError } from "axios";

import short from "short-uuid";

import TextEditor from "../../editor/editor.component";
import ProjectFeature from "../dashboard/feature.component";

import {
  Project,
  ProjectsContext,
  Feature,
} from "../../contexts/projects.context";

import { FlashContext } from "../../contexts/flash.context";

type LongFormProps = {
  projectId: number;
  setLongForm: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  id: 0,
  title: "title",
  img_file_path: "image file path",
  description: "",
  project_id: 0,
};

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardLongForm = ({ projectId, setLongForm }: LongFormProps) => {
  const [textContent, setTextContent] = useState<Feature>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const { projects, setProjects } = useContext(ProjectsContext);
  const project = projects.find((project) => project.id === projectId);

  const { setFlash, setShowAlert } = useContext(FlashContext);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const isUpdating = textContent.id !== 0;
    const url = isUpdating
      ? "http://localhost:5000/api/update-feature"
      : "http://localhost:5000/api/create-feature";

    const formData = new FormData();

    if (isUpdating) {
      formData.append("id", String(textContent.id));
    }

    formData.append("project_id", String(projectId));
    formData.append("title", textContent.title);
    formData.append("description", description);

    if (file) {
      formData.append("img_file", file);
    }

    try {
      const response = (await axios.post<AxiosResponse>(
        url,
        formData,
      )) as Result;

      if (response.data.success === true) {
        setProjects((prev: Project[]) => {
          if (isUpdating) {
            return prev.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    features: project.features.map((feature) =>
                      feature.id === textContent.id
                        ? {
                            ...feature,
                            title: textContent.title,
                            img_file_path: file?.name
                              ? file.name
                              : feature.img_file_path,
                            description,
                          }
                        : feature,
                    ),
                  }
                : project,
            );
          } else {
            return prev.map((project) =>
              project.id === projectId
                ? {
                    ...project,
                    features: [
                      ...project.features,
                      {
                        id: project.features.length + 1,
                        title: textContent.title,
                        img_file_path: file?.name,
                        description,
                        project_id: projectId,
                      },
                    ],
                  }
                : project,
            );
          }
        });

        setFile(null);
        setShowEditForm(false);
        setFlash(
          "Feature successfully updated.",
          "bg-tokyo-22-500",
          "text-tokyo-21-300",
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.log((error as AxiosError).response?.data);
      setFile(null);
      setShowEditForm(false);
      setFlash(
        "Feature could not be updated.",
        "bg-tokyo-23-500",
        "text-tokyo-24-300",
      );
      setShowAlert(true);
    }
  };

  const handleEditForm = (feature: Feature) => {
    setShowEditForm(true);
    setTextContent(feature);
    setDescription(feature.description);
    console.log(feature);
  };

  return (
    <div className="flex flex-col flex-grow h-full" id="long-form-container">
      <h2 className="mb-3 flex-none">Long Description</h2>
      {showEditForm ? (
        <form
          action=""
          className="flex flex-col w-full gap-3 flex-grow"
          encType="mulipart/form-data"
        >
          <input
            type="text"
            id="title"
            className="p-1 text-sm bg-tokyo-1-500 border rounded-lg w-full"
            value={textContent.title}
            onChange={(evt) =>
              setTextContent((prev) => {
                return {
                  ...prev,
                  title: evt.target.value,
                };
              })
            }
          />
          <input
            type="file"
            className="flex-none my-2"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const selectedFile = event.target.files && event.target.files[0];
              const fnParts = selectedFile && selectedFile.name.split(".");
              if (selectedFile && fnParts) {
                const modifiedFile = new File(
                  [selectedFile],
                  fnParts[0] + "-" + short.generate() + "." + fnParts[1],
                  { type: selectedFile.type },
                );
                setFile(modifiedFile);
              }
            }}
          />
          <TextEditor
            setTextContent={setDescription}
            initialValue={description}
          />
        </form>
      ) : (
        <div id="features" className="w-full h-auto flex-grow overflow-y-auto">
          {project?.features.map((feature: Feature, idx) => {
            return (
              <ProjectFeature
                key={idx}
                feature={feature}
                handleEditForm={handleEditForm}
              />
            );
          })}
          <button
            className="mt-2 py-2 w-36 h-8 leading-3 mx-auto"
            onClick={() => handleEditForm(initialState)}
          >
            Add content
          </button>
        </div>
      )}
      <div className="flex justify-between h-auto flex-none">
        {showEditForm && (
          <div>
            <button
              onClick={handleSubmit}
              className="my-5 me-3 py-2 w-24 h-8 leading-3"
            >
              {textContent.id === 0 ? "Add" : "Update"}
            </button>
            <button
              onClick={() => setShowEditForm(false)}
              className="my-5 py-2 w-24  h-8 leading-3"
            >
              Cancel
            </button>
          </div>
        )}
        <button
          onClick={() => setLongForm(false)}
          className={`mt-6 mb-4 flex-none ${showEditForm ? "ms-auto" : "mx-auto"} py-2 w-48 h-8 leading-3`}
        >
          Back to Short Form
        </button>
      </div>
    </div>
  );
};

export default DashboardLongForm;
