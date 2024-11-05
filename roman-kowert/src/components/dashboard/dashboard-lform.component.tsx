import { Dispatch, SetStateAction, useState } from "react";
import TextEditor from "../../editor/editor.component";

type LongFormProps = {
  setLongForm: Dispatch<SetStateAction<boolean>>;
};

const DashboardLongForm = ({ setLongForm }: LongFormProps) => {
  const [textContent, setTextContent] = useState("");
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("hello");
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="mb-3">Long Description</h2>
      <form
        action=""
        className="flex flex-col w-full h-full gap-3"
        onSubmit={handleSubmit}
        encType="mulipart/form-data"
      >
        {showEditForm ? (
          <TextEditor
            setTextContent={setTextContent}
            initialValue={textContent}
          />
        ) : (
          <button
            className="mt-2 py-2 w-36 h-8 leading-3 mx-auto"
            onClick={() => setShowEditForm(true)}
          >
            Add content
          </button>
        )}
      </form>
      <div className="flex justify-between">
        {showEditForm && (
          <div>
            <button className="my-5 me-3 py-2 w-24 h-8 leading-3">Add</button>
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
          className={`my-5 ${showEditForm ? "ms-auto" : "mx-auto"} py-2 w-48 h-8 leading-3`}
        >
          Back to Short Form
        </button>
      </div>
    </div>
  );
};

export default DashboardLongForm;
