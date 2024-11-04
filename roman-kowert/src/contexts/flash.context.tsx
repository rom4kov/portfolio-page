import { useState, createContext, Dispatch, SetStateAction } from "react";

export type FlashMessage = {
  message: string;
  bgColor: string;
  textColor: string;
};

export type FlashContextType = {
  flashMessage: FlashMessage;
  setFlash: (
    flashMessageTex: string,
    flashMessageBgColor: string,
    flashMessageTextColor: string,
  ) => void;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};

export const FlashContext = createContext<FlashContextType>({
  flashMessage: { message: "", bgColor: "", textColor: "" },
  setFlash: () => {},
  showAlert: false,
  setShowAlert: () => false,
});

type FlashProviderChildren = {
  children: JSX.Element;
};

export const FlashProvider = ({ children }: FlashProviderChildren) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessage>({
    message: "",
    bgColor: "",
    textColor: "",
  });
  const [showAlert, setShowAlert] = useState(true);

  const setFlash = (
    flashMessageText: string,
    flashMessageBgColor: string,
    flashMessageTextColor: string,
  ) => {
    setFlashMessage({
      message: flashMessageText,
      bgColor: flashMessageBgColor,
      textColor: flashMessageTextColor,
    });
    setTimeout(() => {
      setShowAlert(false);
      setFlashMessage({ message: "", bgColor: "", textColor: "" });
    }, 5000);
  };

  const value = { flashMessage, setFlash, showAlert, setShowAlert };

  return (
    <FlashContext.Provider value={value}>{children}</FlashContext.Provider>
  );
};
