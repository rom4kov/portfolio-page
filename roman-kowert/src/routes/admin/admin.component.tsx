import { useState, FormEventHandler, FormEvent } from "react";

type AdminProps = {
  location: string;
};

type FormField = "email" | "password";
type FormData = Record<FormField, string>;

const Admin = ({ location }: AdminProps) => {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  })

  console.log(loginData);
  console.log(location);

  const handleLogin: FormEventHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement;

    setLoginData({
      email: emailInput.value,
      password: passwordInput.value
    })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <h1 className="text-center mb-5">Login</h1>
      <form action="" className="flex flex-col gap-2" onSubmit={handleLogin}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
