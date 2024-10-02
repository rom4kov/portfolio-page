import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

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
  console.log(texts);

  useEffect(() => {
    const getTexts = async () => {
      const response = await axios.get("http://localhost:5000/api/get-texts")
      setTexts(response.data.texts);
    }
    getTexts();
  }, [])

  const value = { texts, setTexts };

  return <TextContext.Provider value={value}>{children}</TextContext.Provider>
}



