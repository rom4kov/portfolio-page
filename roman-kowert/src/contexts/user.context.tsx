import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import axios from "axios";

type UserData = {
  user_email: string;
};

type UserContext = {
  loading: boolean;
  currentUser: UserData | null;
  setCurrentUser: Dispatch<SetStateAction<UserData>>;
};

export const UserContext = createContext<UserContext>({
  loading: true,
  currentUser: null,
  setCurrentUser: () => null,
} as UserContext);

type UserProviderChildren = {
  children: JSX.Element;
};

export const UserProvider = ({ children }: UserProviderChildren) => {
  const [currentUser, setCurrentUser] = useState<UserData>({ user_email: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const value = { loading, currentUser, setCurrentUser };

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      setCurrentUser(response.data.users);
      setLoading(false);
    };
    getUsers();
  }, []);


  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
