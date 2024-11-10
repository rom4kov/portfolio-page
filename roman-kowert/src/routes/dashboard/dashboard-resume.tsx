import { useState, useContext, FormEventHandler } from "react";
import axios, { AxiosResponse } from "axios";

import {
  Occupation,
  OccupationsContext,
  OccupationsContextType,
} from "../../contexts/occupations.context";

import OccupationPreview from "../../components/occupation-preview/occupation-preview.component";
import OccupationForm from "../../components/dashboard/occupation-form.component";

import { FlashContext } from "../../contexts/flash.context";

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

const initialState: Occupation = {
  id: 0,
  occupation_type: "work",
  time_period: "time period",
  title: "occupation title",
  description: "occupation description",
};

const DashboardResume = () => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<Occupation>(initialState);
  const [description, setDescription] = useState<string>("");
  const { occupations, setOccupations } =
    useContext<OccupationsContextType>(OccupationsContext);
  const work: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "work";
  });
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const isUpdating = textContent.id === 0;
    const url = isUpdating
      ? "http://localhost:5000/api/create-occupation"
      : "http://localhost:5000/api/update-occupation";

    const formData = new FormData();
    formData.append("id", String(textContent.id));
    formData.append("title", textContent.title);
    formData.append("time_period", textContent.time_period);
    formData.append("description", description);
    formData.append("occupation_type", textContent.occupation_type);

    const response = (await axios.post<AxiosResponse>(url, formData)) as Result;

    console.log(response.data);

    // if (response.data.success == true) {
    //   setOccupations((prev) => {
    //     return occupations.some(text => text.page === "resume") ?
    //       (prev.map((text) => {
    //         if (text.page === "resume") {
    //           text.body = textContent;
    //         }
    //         return text;
    //       })) :
    //       ([
    //         ...prev,
    //         {
    //           id: prev.length + 1,
    //           body: textContent,
    //           page: "resume"
    //         },
    //       ]);
    //   });
    // };

    setShowEditForm(false);
    setFlash("Occupation successfully updated.", "bg-tokyo-22-500", "text-tokyo-21-300");
    setShowAlert(true);
  };

  const handleEditForm = (occupation: Occupation) => {
    setShowEditForm(true);
    setTextContent(occupation);
    setDescription(occupation.description);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit Resume Content</h2>
      {!showEditForm ? (
        <div className="w-full h-full flex flex-col justify-between flex-grow">
          <div
            className="w-full mt-3 flex flex-col items-start gap-5 overflow-y-auto"
            id="projects-edit-content"
          >
            {work.map((work) => {
              return (
                <OccupationPreview
                  occupation={work}
                  setOccupation={setOccupations}
                  handleEditForm={handleEditForm}
                />
              );
            })}
          </div>
          <button
            className="h-8 w-max mt-8 mx-auto mb-5 p-2 leading-[0.9rem] text-sm"
            onClick={() => handleEditForm(initialState)}
          >
            Add new occupation
          </button>
        </div>
      ) : (
        <OccupationForm
          handleSubmit={handleSubmit}
          setShowEditForm={setShowEditForm}
          textContent={textContent}
          setTextContent={setTextContent}
          setDescription={setDescription}
        />
      )}
    </div>
  );
};

export default DashboardResume;
