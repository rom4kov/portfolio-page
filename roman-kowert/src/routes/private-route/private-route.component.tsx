import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useContext(UserContext);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const response = await axios.get("http://localhost:5000/api/auth_state");
  //     console.log(response.data);
  //     setAuthState(response.data);
  //   };
  //   setTimeout(() => {
  //     getUsers();
  //   }, 1000);
  // }, [])

  return currentUser?.authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
