import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";
import {
  TextElement,
  TextContext,
  TextContextType,
} from "../../contexts/text.context";
import TextEditor from "../../editor/editor.component";

import { FlashContext } from "../../contexts/flash.context";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const DashboardHome = () => {
  const [textContent, setTextContent] = useState<string>("");
  const { texts, setTexts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "home";
  }) as TextElement;

  const { setFlash, setShowAlert } = useContext(FlashContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const data = {
      body: textContent,
      page: "home",
    };

    try {
      const response = await axios.post<AxiosResponse>(
        "https://www.romankowert.de/api/update-text",
        data,
      ) as Result;

      if (response.data.success == true) {
        setTexts((prev) => {
          return texts.some(text => text.page === "home") ?
            (prev.map((text) => {
              if (text.page === "home") {
                text.body = textContent;
              }
              return text;
            })) :
            ([
              ...prev,
              {
                id: prev.length + 1,
                body: textContent,
                page: "home"
              },
            ]);
        });

        setFlash("Text successfully updated.", "bg-tokyo-22-500", "text-tokyo-21-300");
        setShowAlert(true);
      };
    } catch (error) {
      console.error("Error uploading project:", error);
      setFlash("Text could not be updated.", "bg-tokyo-24-500", "text-tokyo-3-500");
      setShowAlert(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit Home Content</h2>
      <form
        action=""
        className="flex flex-col w-[95%] h-[100%] gap-3"
        onSubmit={handleSubmit}
      >
        <TextEditor
          setTextContent={setTextContent}
          initialValue={value?.body ? value?.body : "Type..."}
        />
        <button type="submit" className="mb-4 leading-3">Update</button>
      </form>
    </div>
  );
};

export default DashboardHome;
