import { Dispatch, SetStateAction, FormEvent, FormEventHandler } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
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

    const response = await axios.post("http://localhost:5000/api/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    setCurrentUser(response.data);
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1000);
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
