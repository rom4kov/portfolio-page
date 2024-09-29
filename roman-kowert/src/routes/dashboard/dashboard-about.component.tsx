import { useState, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import TextEditor from "../../editor/editor.component";

const DashboardAbout = () => {
  const [textContent, setTextContent] = useState<string>("");

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();
    const data = {
      body: textContent,
      page: "about"
    }

    const response = await axios.post<AxiosResponse>(
      "http://localhost:5000/api/create-text",
      data,
    );
    console.log(response);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit About Content</h2>
      <h3>Change About Text</h3>
      <form
        action=""
        className="flex flex-col w-[45rem] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <TextEditor
          // onChange={(evt) => setTextContent(evt.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DashboardAbout;
