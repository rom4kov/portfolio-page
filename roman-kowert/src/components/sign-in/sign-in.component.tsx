import { Dispatch, SetStateAction, FormEvent, FormEventHandler } from "react";
import axios from "axios";

type UserData = {
  user_email: string;
};

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

type SignInProps = {
  loginData: FormData;
  setLoginData: Dispatch<SetStateAction<FormData>>;
  setCurrentUser: Dispatch<SetStateAction<UserData>>;
};

const SignIn = ({ loginData, setLoginData, setCurrentUser }: SignInProps) => {
  const handleSignIn: FormEventHandler = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: loginData.email,
        password: loginData.password,
      },
    });
    setCurrentUser(response.data);
  };
  return (
    <div>
      <h1 className="text-center mb-5">Login</h1>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSignIn}>
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

export default SignIn;
