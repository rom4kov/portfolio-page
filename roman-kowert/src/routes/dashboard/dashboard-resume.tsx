import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import {
  TextElement,
  TextContext,
  TextContextType,
} from "../../contexts/text.context";
import TextEditor from "../../editor/editor.component";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardResume = () => {
  const [textContent, setTextContent] = useState<string>("");
  const { texts, setTexts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "resume";
  }) as TextElement;

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const data = {
      body: textContent,
      page: "resume",
    };

    const response = await axios.post<AxiosResponse>(
      "http://localhost:5000/api/update-text",
      data,
    ) as Result;

    if (response.data.success == true) {
      setTexts((prev) => {
        return texts.some(text => text.page === "resume") ?
          (prev.map((text) => {
            if (text.page === "resume") {
              text.body = textContent;
            }
            return text;
          })) :
          ([
            ...prev,
            {
              id: prev.length + 1,
              body: textContent,
              page: "resume"
            },
          ]);
      });
    };
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit Resume Content</h2>
      <form
        action=""
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <TextEditor
          setTextContent={setTextContent}
          initialValue={value?.body ? value?.body : "Type..."}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DashboardResume;

