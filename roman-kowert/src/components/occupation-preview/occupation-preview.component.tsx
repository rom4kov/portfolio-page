import { useContext, Dispatch, SetStateAction } from "react";

import { Occupation } from "../../contexts/occupations.context";
import { FlashContext } from "../../contexts/flash.context";

import axios, { AxiosResponse } from "axios";

type OccupationProps = {
  occupation: Occupation;
  handleEditForm?: (occupation: Occupation) => void;
  setOccupation?: Dispatch<SetStateAction<Occupation[] | []>>;
};

type Result = AxiosResponse & {
  data: {
    success: boolean;
  };
};

type deleteFunc = (occupation_id: number) => Promise<void>;

const OccupationPreview = ({
  occupation,
  handleEditForm,
  setOccupation,
}: OccupationProps) => {
  const { setFlash, setShowAlert } = useContext(FlashContext);

  const deleteProject: deleteFunc = async (occupation_id: number) => {
    const response = (await axios.post<AxiosResponse>(
      "http://localhost:5000/api/delete-occupation",
      { id: occupation_id },
    )) as Result;

    if (response.data.success === true && setOccupation) {
      setOccupation((prev: Occupation[]) => {
        return prev.filter((occupation) => occupation.id !== occupation_id);
      });
    }

    setFlash(
      "Project has been deleted",
      "bg-tokyo-22-500",
      "text-tokyo-21-300",
    );
    setShowAlert(true);
  };

  return (
    <div className="w-[95%] items-start hover:bg-tokyo-4-300 mx-auto p-3 rounded-lg">
      <div className="mt-0 flex gap-3">
        <span className="text-start text-xs w-[22.5%] mt-1.5">{occupation.time_period}</span>
        <div className="flex flex-col w-[77.5%]">
          <div className="mt-0 mb-2 flex gap-2">
            <h3 className="text-[1.1rem] font-bold">{occupation.title}</h3>
            {handleEditForm && (
              <div className="ms-auto -mt-0.5">
                <button
                  className="me-1.5 h-6 px-1 leading-[0.5rem] text-xs"
                  onClick={() => handleEditForm(occupation)}
                >
                  Edit
                </button>
                <button
                  className="-me-1 h-6 px-1 leading-[0.5rem] text-xs"
                  onClick={() => deleteProject(occupation.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div
            className="w-full text-start text-sm"
            dangerouslySetInnerHTML={{
              __html: occupation.description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OccupationPreview;
