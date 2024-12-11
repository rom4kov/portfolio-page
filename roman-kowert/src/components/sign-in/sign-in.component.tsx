import { Dispatch, SetStateAction, FormEvent, FormEventHandler } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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

const SignIn = ({ loginData, setLoginData }: SignInProps) => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignIn: FormEventHandler = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    const response = await axios.post(`${apiUrl}/api/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setCurrentUser(response.data);
    const userData = JSON.stringify(response.data);
    localStorage.setItem("user", userData);
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h1 className="text-center mb-5">Login</h1>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSignIn}>
        <input
          className="text-[#000000]"
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
          className="text-[#000000]"
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
