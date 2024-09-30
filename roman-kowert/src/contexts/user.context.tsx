import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";

type UserData = {
  email: string | null;
  authenticated: boolean;
};

type UserContext = {
  currentUser: UserData | null;
  setCurrentUser: Dispatch<SetStateAction<UserData | null>>;
  loading: boolean;
};

export const UserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => null,
  loading: true,
} as UserContext);

type UserProviderChildren = {
  children: JSX.Element;
};

export const UserProvider = ({ children }: UserProviderChildren) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    setLoading(true);
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrentUser(foundUser);
    }
    setLoading(false);
  }, []);


  const value = { currentUser, setCurrentUser, loading };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
};
