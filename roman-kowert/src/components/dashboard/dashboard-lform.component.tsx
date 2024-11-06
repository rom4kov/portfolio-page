import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  FormEventHandler,
  ChangeEvent,
} from "react";

import axios, { AxiosResponse } from "axios";

import TextEditor from "../../editor/editor.component";

import { ProjectsContext, Feature } from "../../contexts/projects.context";

import { getImageURL } from "../../utils/image-util";

type LongFormProps = {
  projectId: number;
  setLongForm: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  id: 0,
  title: "title",
  img_file_path: "image file path",
};

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardLongForm = ({ projectId, setLongForm }: LongFormProps) => {
  const [textContent, setTextContent] = useState(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const { projects, setProjects } = useContext(ProjectsContext);
  const project = projects.find((project) => project.id === projectId);
  console.log(project?.features);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/create-feature";

    const formData = new FormData();

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

      console.log(response);
      // if (response.data.success === true) {
      //   setProjects((prev) => {
      //     if (isUpdating) {
      //       return prev.map((project) =>
      //         project.id === textContent.id
      //           ? {
      //               ...project,
      //               id: textContent.id,
      //               title: textContent.title,
      //               img_file_path: file?.name
      //                 ? file.name
      //                 : project.img_file_path,
      //               description,
      //             }
      //           : project,
      //       );
      //     } else {
      //       return [
      //         ...prev,
      //         {
      //           id: 0,
      //           title: textContent.title,
      //           img_file_path: response.data.file_path,
      //           description,
      //         },
      //       ];
      //     }
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="mb-3">Long Description</h2>
      {showEditForm ? (
        <form
          action=""
          className="flex flex-col w-full h-full gap-3"
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
              setFile(event.target.files && event.target.files[0]);
            }}
          />
          <TextEditor
            setTextContent={setDescription}
            initialValue={description}
          />
        </form>
      ) : (
        <div className="w-full h-[77.5%] overflow-y-scroll">
          {project?.features.map((feature: Feature) => {
            return (
              <div className="mt-3 mb-8 text-start">
                <h3 className="mb-2 font-bold">{feature.title}</h3>
                <img
                  className="mb-3"
                  src={getImageURL(feature.img_file_path)}
                  alt=""
                />
                <div
                  dangerouslySetInnerHTML={{ __html: feature.description }}
                />
              </div>
            );
          })}
          <button
            className="mt-2 py-2 w-36 h-8 leading-3 mx-auto"
            onClick={() => setShowEditForm(true)}
          >
            Add content
          </button>
        </div>
      )}
      <div className="flex justify-between">
        {showEditForm && (
          <div>
            <button
              onClick={handleSubmit}
              className="my-5 me-3 py-2 w-24 h-8 leading-3"
            >
              Add
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
          className={`mt-6 mb-3 ${showEditForm ? "ms-auto" : "mx-auto"} py-2 w-48 h-8 leading-3`}
        >
          Back to Short Form
        </button>
      </div>
    </div>
  );
};

export default DashboardLongForm;
