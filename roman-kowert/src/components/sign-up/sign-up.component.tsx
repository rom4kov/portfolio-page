import { Dispatch, SetStateAction, FormEvent, FormEventHandler } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserData = {
  user_email: string;
};

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

type SignUpProps = {
  setLoginData: Dispatch<SetStateAction<FormData>>;
  loginData: FormData;
  setCurrentUser: Dispatch<SetStateAction<UserData>>;
};

const SignUp = ({ setLoginData, loginData, setCurrentUser }: SignUpProps) => {
  const navigate = useNavigate();

  const handleSignUp: FormEventHandler = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
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
    setCurrentUser(response.data);
    const userData = JSON.stringify(response.data);
    localStorage.setItem("user", userData);
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h1 className="text-center mb-5">Register</h1>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSignUp}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
