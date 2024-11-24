import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export type TextElement = {
  id: number,
  body: string,
  page: string
}

export type TextContextType = {
  texts: TextElement[]
  setTexts: Dispatch<SetStateAction<TextElement[] | []>>;
}

export const TextContext = createContext<TextContextType>({
  texts: [],
  setTexts: () => [],
})

type TextProviderChildren = {
  children: JSX.Element;
}

export const TextProvider = ({ children }: TextProviderChildren ) => {
  const [texts, setTexts] = useState<TextElement[] | []>([]);

  useEffect(() => {
    const getTexts = async () => {
      const response = await axios.get(`${apiUrl}/api/get-texts`)
      console.log(response)
      setTexts(response.data.texts);
    }
    getTexts();
  }, [])

  const value = { texts, setTexts };

  return <TextContext.Provider value={value}>{children}</TextContext.Provider>
}

