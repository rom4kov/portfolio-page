import { useState, Dispatch, SetStateAction, FormEventHandler } from "react";

import TextEditor from "../../editor/editor.component";

import { Occupation } from "../../contexts/occupations.context";

import { getImageURL } from "../../utils/image-util";

type OccupationFormProps = {
  handleSubmit: FormEventHandler;
  setShowEditForm: Dispatch<SetStateAction<boolean>>;
  textContent: Occupation;
  setTextContent: Dispatch<SetStateAction<Occupation>>;
  setDescription: Dispatch<SetStateAction<string>>;
};

const OccupationForm = ({
  handleSubmit,
  setShowEditForm,
  textContent,
  setTextContent,
  setDescription,
}: OccupationFormProps) => {
  const [arrowUp, setArrowUp] = useState<boolean>(false);
  const [showInstructorField, setShowInstructorField] = useState(
    textContent.occupation_type === "course" ? true : false,
  );

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
          className="py-1 px-2 text-sm bg-tokyo-1-500 border rounded-lg w-full"
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
        <div className="flex gap-3">
          <input
            type="text"
            className="py-1 px-2 text-sm bg-tokyo-1-500 border rounded-lg w-full"
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
          <div
            className={`border rounded-lg w-full ${arrowUp ? "after:content-['⌃'] after:translate-y-[0.5rem]" : "after:content-['⌄'] after:translate-y-[0.2rem]"} after:absolute after:text-md after:text-tokyo-14-500 after:w-3 after:h-3 after:leading-4 after:translate-x-[-1.25rem]`}
          >
            <select
              className="py-1 px-2 text-sm align-middle bg-tokyo-1-500 border-none rounded-lg w-full appearance-none"
              value={textContent.occupation_type}
              onFocus={() => setArrowUp(true)}
              onBlur={() => setArrowUp(false)}
              onChange={(evt) => {
                setTextContent((prev) => {
                  return {
                    ...prev,
                    occupation_type: evt.target.value,
                  };
                });
                setArrowUp(false);
                if (evt.target.value === "course") {
                  setShowInstructorField(true);
                } else {
                  setShowInstructorField(false);
                }
              }}
            >
              <option value="work">Work</option>
              <option value="course">Course</option>
            </select>
          </div>
        </div>
        {showInstructorField && (
          <input
            type="text"
            id="instructor"
            placeholder="Instructor"
            className="py-1 px-2 text-sm bg-tokyo-1-500 border rounded-lg w-full"
            value={textContent.instructor}
            onChange={(evt) =>
              setTextContent((prev) => {
                return {
                  ...prev,
                  instructor: evt.target.value,
                };
              })
            }
          />
        )}
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
        <TextEditor
          setTextContent={setDescription}
          initialValue={textContent.description}
        />
        <div className="mb-4 flex flex-none justify-start gap-3">
          <button type="submit" className="py-2 h-8 leading-3">
            {textContent.id === 0 ? "Add occupation" : "Update"}
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
