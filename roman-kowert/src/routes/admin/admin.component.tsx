import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


import SignUp from "../../components/sign-up/sign-up.component";
import SignIn from "../../components/sign-in/sign-in.component";

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

type UserData = {
  user_email: string;
};

type Users = number | null;

const Admin = () => {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState<UserData>({ user_email: "" });
  const [users, setUsers] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getUsers = async () => {
      const response = await axios.get("https://www.romankowert.de/api/users");
      setUsers(response.data.users);
      setLoading(false);
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="fixed top-5 left-5">
        {currentUser.user_email ? currentUser.user_email : "No user logged in"}
      </div>
      {!loading && (
        <div>
          {users && users > 0 ? (
            <SignIn
              loginData={loginData}
              setLoginData={setLoginData}
              setCurrentUser={setCurrentUser}
            />
          ) : (
            <SignUp
              loginData={loginData}
              setLoginData={setLoginData}
              setCurrentUser={setCurrentUser}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
