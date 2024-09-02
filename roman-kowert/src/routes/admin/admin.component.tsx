import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import axios from "axios";

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

type UserData = {
  "user_email": string;
};

const Admin = () => {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState<UserData>({"user_email": ""})
  const [users, setUsers] = useState()

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users")
        .then(response => {
          console.log(response.data)
          return response;
        })
        .catch(error => {
          console.log(error);
          return error;
        })

      setUsers(response.data);
    };

    getUsers()
  }, [])

  console.log(users)

  const handleLogin: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: loginData.email,
        password: loginData.password,
      },
    });
    console.log(response.data);
    setCurrentUser(response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="fixed top-5 left-5">{currentUser.user_email ? currentUser.user_email : "No user logged in"}</div>
      <h1 className="text-center mb-5">Login</h1>
      <form action="" className="flex flex-col gap-2" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          onChange={(evt) => {
            setLoginData((prev) => {
              return {
                ...prev,
                email: evt.target.value,
              };
            });
          }}
        />
        <input
          type="password"
          name="password"
          onChange={(evt) => {
            setLoginData((prev) => {
              return {
                ...prev,
                password: evt.target.value,
              };
            });
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
