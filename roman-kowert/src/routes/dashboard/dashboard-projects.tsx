import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import {
  TextElement,
  TextContext,
  TextContextType,
} from "../../contexts/text.context";
import TextEditor from "../../editor/editor.component";

type Projects = {
  title: string,
  description: string
}

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardProjects = () => {
  const [textContent, setTextContent] = useState<Projects>({
    title: "",
    description: ""
  });
  const { texts, setTexts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "projects";
  }) as TextElement;
  console.log(value?.body);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const data = {
      title: textContent.title,
      body: textContent.description,
    };

    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/update-projects",
      data,
    )) as Result;

    if (response.data.success == true) {
      setTexts((prev) => {
        return texts.some((text) => text.page === "projects")
          ? prev.map((text) => {
              if (text.page === "projects") {
                text.body = textContent;
              }
              return text;
            })
          : [
              ...prev,
              {
                id: prev.length + 1,
                page: "projects",
                body: textContent,
              },
            ];
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit Projects Content</h2>
      <form
        action=""
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="title"
          className="p-1 text-sm bg-tokyo-1-500 border rounded-lg w-full"
          placeholder="Title"
        />
        <TextEditor
          setTextContent={setTextContent}
          initialValue={value?.body ? value?.body : "Type..."}
        />
        <button type="submit" className="h-8 leading-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default DashboardProjects;
