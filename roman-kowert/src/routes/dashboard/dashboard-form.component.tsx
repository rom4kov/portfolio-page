import { Dispatch, SetStateAction, FormEventHandler } from "react";
import TextEditor from "../../editor/editor.component";

import { Project } from "../../contexts/projects.context";

type DashboardFormProps = {
  handleSubmit: FormEventHandler,
  setShowEditForm: Dispatch<SetStateAction<boolean>>,
  textContent: Project,
  setTextContent: Dispatch<SetStateAction<Project>>,
  setDescription: Dispatch<SetStateAction<string>>,
}

const DashboardForm = ({
  handleSubmit,
  setShowEditForm,
  textContent,
  setTextContent,
  setDescription,
}: DashboardFormProps) => {
  return (
    <form
      action=""
      className="flex flex-col w-[95%] h-[100%] gap-3"
      onSubmit={handleSubmit}
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
      <TextEditor
        setTextContent={setDescription}
        initialValue={textContent.description}
      />
      <div className="flex justify-start gap-3">
        <button type="submit" className="h-8 leading-3">
          Update
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
