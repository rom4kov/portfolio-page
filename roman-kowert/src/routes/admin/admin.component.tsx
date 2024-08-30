import React from "react";

type AdminProps = {
  location: string;
};

const Admin = ({ location }: AdminProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <h1 className="text-center">Login</h1>
      <form action="" className="flex flex-col">
        <input type="email" name="email" />
        <input type="password" name="password" />
      </form>
    </div>
  );
};

export default Admin;
