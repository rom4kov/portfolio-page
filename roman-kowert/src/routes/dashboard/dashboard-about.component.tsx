import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import { TextElement, TextContext, TextContextType } from "../../contexts/text.context";
import TextEditor from "../../editor/editor.component";

type Result = AxiosResponse & {
  data: {
    success: boolean,
  }
}

const DashboardAbout = () => {
  const [textContent, setTextContent] = useState<string>("");
  const { texts, setTexts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "about";
  }) as TextElement;
  console.log(value);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const data = {
      body: textContent,
      page: "about",
    };

    const response = await axios.post<AxiosResponse>(
      "http://localhost:5000/api/update-text",
      data,
    ) as Result;

    if (response.data.success == true) {
      setTexts((prev) => {
        return texts.some(text => text.page === "about") ?
          (prev.map((text) => {
            if (text.page === "about") {
              text.body = textContent;
            }
            return text;
          })) :
          ([
            ...prev,
            {
              id: prev.length + 1,
              body: textContent,
              page: "about"
            },
          ]);
      });
    };
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit About Content</h2>
      <h3>Change About Text</h3>
      <form
        action=""
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <TextEditor setTextContent={setTextContent} initialValue={value?.body ? value.body : "Type..." } />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default DashboardAbout;
