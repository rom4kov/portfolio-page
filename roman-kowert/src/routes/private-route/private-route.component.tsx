import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useContext(UserContext);

  return currentUser?.authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
