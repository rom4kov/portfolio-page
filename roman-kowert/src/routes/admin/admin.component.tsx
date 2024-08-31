import { useState, FormEventHandler, FormEvent } from "react";
import axios from "axios";

type AdminProps = {
  location: string;
};

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

const Admin = ({ location }: AdminProps) => {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });

  console.log(loginData);
  console.log(location);

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
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
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
