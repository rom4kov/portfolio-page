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

  return (
    <div className="w-full h-full">
      {!longForm ? (
        <form
          action=""
          className="flex flex-col w-full h-full gap-3"
          onSubmit={handleSubmit}
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
            type="text"
            id="keywords"
            className="flex-none p-1 text-sm bg-tokyo-1-500 border rounded-lg w-full"
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
          <input
            type="file"
            className="flex-none my-2"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFile(event.target.files && event.target.files[0]);
            }}
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
              Edit Long Description
            </button>
          </div>
        </form>
      ) : (
        <div className="h-full flex flex-col">
          <h2 className="mb-3">Long Description</h2>
          <DashboardLongForm />
          <button
            onClick={() => setLongForm(false)}
            className="my-5 mx-auto py-2 w-48 h-8 leading-3"
          >
              Back to Short Form
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardForm;
