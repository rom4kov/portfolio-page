import { useState, useContext, FormEventHandler, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { TextContext } from "../../contexts/text.context";
import TextEditor from "../../editor/editor.component";

const DashboardAbout = () => {
  const [textContent, setTextContent] = useState<string>("");
  const { texts, setTexts } = useContext(TextContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();
    const data = {
      body: textContent,
      page: "about",
    };

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
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <TextEditor setTextContent={setTextContent} initialValue={texts[0].body} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DashboardAbout;
