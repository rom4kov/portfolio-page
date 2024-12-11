import {
  useState,
  Dispatch,
  SetStateAction,
  FormEventHandler,
  ChangeEvent,
} from "react";

import TextEditor from "../../editor/editor.component";
import DashboardLongForm from "../../components/dashboard/dashboard-lform.component";

import { Project } from "../../contexts/projects.context";

import { getImageURL } from "../../utils/image-util";

type DashboardFormProps = {
  handleSubmit: FormEventHandler;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  textContent: Project;
  setTextContent: Dispatch<SetStateAction<Project>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setDescription: Dispatch<SetStateAction<string>>;
};

const DashboardForm = ({
  handleSubmit,
  setShowEditForm,
  textContent,
  setTextContent,
  setFile,
  setDescription,
}: DashboardFormProps) => {
  const [longForm, setLongForm] = useState(false);
  const [arrowUp, setArrowUp] = useState<boolean>(false);

  return (
    <div className="w-full flex-grow overflow-x-hidden overflow-y-auto">
      {!longForm ? (
        <form
          action=""
          className="flex flex-col w-full h-full gap-3"
          onSubmit={handleSubmit}
          encType="mulipart/form-data"
        >
          <div className="flex flex-row gap-3 w-full">
            <input
              type="text"
              id="title"
              className="py-1 ps-2 text-sm bg-tokyo-1-500 border rounded-lg flex-grow"
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
            <div
              className={`border rounded-lg w-[5rem] ${arrowUp ? "after:content-['⌃'] after:translate-y-[0.5rem]" : "after:content-['⌄'] after:translate-y-[0.2rem]"} after:absolute after:text-md after:text-tokyo-14-500 after:w-3 after:h-3 after:leading-4 after:translate-x-[-1.25rem]`}
            >
              <select
                className="py-1 px-2 text-sm align-middle bg-tokyo-1-500 border-none rounded-lg w-full appearance-none"
                value={textContent.project_type}
                onFocus={() => setArrowUp(true)}
                onBlur={() => setArrowUp(false)}
                onChange={(evt) => {
                  setTextContent((prev) => {
                    return {
                      ...prev,
                      project_type: evt.target.value,
                    };
                  });
                  setArrowUp(false);
                }}
              >
                <option value="work">Work</option>
                <option value="project">Project</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            id="keywords"
            className="flex-none py-1 ps-2 text-sm bg-tokyo-1-500 border rounded-lg w-full"
            value={textContent.keywords}
            onChange={(evt) =>
              setTextContent((prev) => {
                return {
                  ...prev,
                  keywords: evt.target.value.split(/, */),
                };
              })
            }
          />
          <div className="flex gap-3 items-center my-1">
            <img
              className="h-12"
              src={getImageURL(textContent.img_file_path)}
              alt=""
            />
            <p>{textContent.img_file_path}</p>
            <input
              type="file"
              className="flex-none my-2"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFile(event.target.files && event.target.files[0]);
              }}
            />
          </div>
          <input
            type="text"
            id="url"
            className="flex-none py-1 ps-2 text-sm bg-tokyo-1-500 border rounded-lg w-full"
            value={textContent.url}
            placeholder="website url"
            onChange={(evt) =>
              setTextContent((prev) => {
                return {
                  ...prev,
                  url: evt.target.value,
                };
              })
            }
          />
          <TextEditor
            setTextContent={setDescription}
            initialValue={textContent.description}
          />
          <div className="mb-4 flex flex-none justify-start gap-3">
            <button type="submit" className="py-2 h-8 leading-3">
              {textContent.id === 0 ? "Add project" : "Update"}
            </button>
            <button
              onClick={() => setShowEditForm(false)}
              className="py-2 h-8 leading-3"
            >
              Cancel
            </button>
            <button
              type="button"
              className="ms-auto py-2 h-8 leading-3"
              onClick={() => setLongForm(true)}
            >
              Edit Project Details
            </button>
          </div>
        </form>
      ) : (
        <DashboardLongForm
          projectId={textContent.id}
          setLongForm={setLongForm}
        />
      )}
    </div>
  );
};

export default DashboardForm;
