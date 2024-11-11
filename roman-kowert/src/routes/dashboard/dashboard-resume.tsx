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
  const education: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "course";
  });
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    const isUpdating = textContent.id !== 0;
    const url = isUpdating
      ? "http://localhost:5000/api/update-occupation"
      : "http://localhost:5000/api/create-occupation";

    const formData = new FormData();
    formData.append("id", String(textContent.id));
    formData.append("title", textContent.title);
    formData.append("time_period", textContent.time_period);
    formData.append("description", description);
    formData.append("occupation_type", textContent.occupation_type);

    const response = (await axios.post<AxiosResponse>(url, formData)) as Result;

    try {
      if (response.data.success == true) {
        setOccupations((prev) => {
          if (isUpdating) {
            return prev.map((occupation) =>
              occupation.id === textContent.id
                ? {
                    id: textContent.id,
                    title: textContent.title,
                    time_period: textContent.time_period,
                    description: description,
                    occupation_type: textContent.occupation_type,
                  }
                : occupation,
            );
          } else {
            return [
              ...prev,
              {
                id: occupations.length + 1,
                title: textContent.title,
                time_period: textContent.time_period,
                description: description,
                occupation_type: textContent.occupation_type,
              },
            ];
          }
        });

        setShowEditForm(false);
        setFlash(
          "Occupation successfully updated.",
          "bg-tokyo-22-500",
          "text-tokyo-21-300",
        );
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error uploading project:", error);
      setShowEditForm(false);
      setFlash(
        "Occupation could not be updated.",
        "bg-tokyo-24-500",
        "text-tokyo-3-500",
      );
      setShowAlert(true);
    }
  };

  const handleEditForm = (occupation: Occupation) => {
    setShowEditForm(true);
    setTextContent(occupation);
    setDescription(occupation.description);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-3">
      <h2 className="text-2xl my-3">Edit Resume Content</h2>
      {!showEditForm ? (
        <div className="w-full h-full flex-grow">
          <div className="w-full h-[65vh] flex flex-col justify-start flex-grow overflow-y-auto">
            <h3 className="font-bold text-tokyo-22-500">WORK</h3>
            <div
              className="w-full mt-3 flex flex-col items-start gap-5 overflow-y-visible occupation-list"
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
            <h3 className="mt-8 font-bold text-tokyo-22-500">
              COURSES &amp; EDUCATION
            </h3>
            <div
              className="w-full mt-3 flex flex-col items-start gap-5 overflow-y-visible"
              id="projects-edit-content"
            >
              {education.map((work) => {
                return (
                  <OccupationPreview
                    occupation={work}
                    setOccupation={setOccupations}
                    handleEditForm={handleEditForm}
                  />
                );
              })}
            </div>
          </div>
          <button
            className="h-8 w-max mt-5 mx-auto mb-5 p-2 leading-[0.9rem] text-sm"
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
