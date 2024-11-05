import { useState } from "react";
import TextEditor from "../../editor/editor.component";

const DashboardLongForm = () => {
  const [textContent, setTextContent] = useState("");
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("hello");
  };
  return (
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
          className="mt-5 py-2 w-36 h-8 leading-3 mx-auto"
          onClick={() => setShowEditForm(true)}
        >
          Add content
        </button>
      )}
    </form>
  );
};

export default DashboardLongForm;
