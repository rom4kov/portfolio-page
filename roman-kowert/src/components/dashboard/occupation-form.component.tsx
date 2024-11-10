import { Dispatch, SetStateAction, FormEventHandler } from "react";

import TextEditor from "../../editor/editor.component";

import { Occupation } from "../../contexts/occupations.context";

type OccupationFormProps = {
  handleSubmit: FormEventHandler;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  textContent: Occupation;
  setTextContent: Dispatch<SetStateAction<Occupation>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setDescription: Dispatch<SetStateAction<string>>;
};

const OccupationForm = ({
  handleSubmit,
  setShowEditForm,
  textContent,
  setTextContent,
  setDescription,
}: OccupationFormProps) => {
  return (
    <div className="w-full flex-grow overflow-y-auto px-4">
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
          className="p-1 text-sm bg-tokyo-1-500 border rounded-lg w-full"
          value={textContent.time_period}
          onChange={(evt) =>
            setTextContent((prev) => {
              return {
                ...prev,
                time_period: evt.target.value,
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
        </div>
      </form>
    </div>
  );
};

export default OccupationForm;
