import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type UserData = {
  email: string | null;
  authenticated: boolean;
};

type UserContext = {
  currentUser: UserData | null;
  setCurrentUser: Dispatch<SetStateAction<UserData | null>>;
};

export const UserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => null,
} as UserContext);

type UserProviderChildren = {
  children: JSX.Element;
};

export const UserProvider = ({ children }: UserProviderChildren) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>({ email: "", authenticated: false });
  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
