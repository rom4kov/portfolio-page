import { useState, createContext } from "react";

export type FlashMessage = {
  message: string,
  color: string,
}

export type FlashContextType = {
  flashMessage: FlashMessage
  setFlash: (flashMessageTex: string, flashMessageColor: string) => void;
}

export const FlashContext = createContext<FlashContextType>({
  flashMessage: { message: "", color: "" },
  setFlash: () => {},
})

type FlashProviderChildren = {
  children: JSX.Element;
}

export const FlashProvider = ({ children }: FlashProviderChildren ) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage>({
    message: "",
    color: ""
  });

  const setFlash = (flashMessageText: string, flashMessageColor: string) => {
    setFlashMessage({ message: flashMessageText, color: flashMessageColor });
    setTimeout(() => {
      setFlashMessage({ message: "", color: "" });
    }, 5000);
  };

  const value = { flashMessage, setFlash };

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>
}



