import {
  Dispatch,
  SetStateAction,
  FormEventHandler,
  ChangeEvent,
} from "react";
import TextEditor from "../../editor/editor.component";

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
  return (
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
        type="file"
        className="my-2"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setFile(event.target.files && event.target.files[0]);
        }}
      />
      <TextEditor
        setTextContent={setDescription}
        initialValue={textContent.description}
      />
      <div className="flex justify-start gap-3">
        <button type="submit" className="h-8 leading-3">
          {textContent.id === 0 ? "Add project" : "Update"}
        </button>
        <button
          onClick={() => setShowEditForm(false)}
          className="h-8 leading-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DashboardForm;
