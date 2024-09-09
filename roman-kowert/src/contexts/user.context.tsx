import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { useLocation } from "react-router-dom";

import axios from "axios";

type UserData = {
  email: string | null;
  authenticated: boolean;
};

type UserContext = {
  loading: boolean;
  currentUser: UserData | null;
  setCurrentUser: Dispatch<SetStateAction<UserData | null>>;
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
  const [currentUser, setCurrentUser] = useState<UserData | null>({ email: "", authenticated: false });
  const [loading, setLoading] = useState<boolean>(true);
  const value = { loading, currentUser, setCurrentUser };

  const location = useLocation();

  useEffect(() => {
      setLoading(true);
      // const getUsers = async () => {
      //   const response = await axios.get("http://localhost:5000/api/users");
      //   console.log(response.data);
      //   setCurrentUser(response.data);
        setLoading(false);
      // };
      // getUsers();
  }, []);


  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
