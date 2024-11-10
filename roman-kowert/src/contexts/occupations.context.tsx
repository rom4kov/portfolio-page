import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

export type Occupation = {
  id: number;
  title: string;
  description: string;
  time_period: string;
};

export type OccupationsContextType = {
  occupations: Occupation[] | [];
  setOccupations: Dispatch<SetStateAction<Occupation[] | []>>;
};

export const OccupationsContext = createContext<OccupationsContextType>({
  occupations: [],
  setOccupations: () => [],
});

type OccupationsProviderChildren = {
  children: JSX.Element;
};

export const OccupationsProvider = ({
  children,
}: OccupationsProviderChildren) => {
  const [occupations, setOccupations] = useState<Occupation[] | []>([]);

  useEffect(() => {
    const getOccupations = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/get-occupations",
      );
      setOccupations(response.data.occupations);
    };
    getOccupations();
  }, []);

  const value = { occupations, setOccupations };

  return (
    <OccupationsContext.Provider value={value}>
      {children}
    </OccupationsContext.Provider>
  );
};
