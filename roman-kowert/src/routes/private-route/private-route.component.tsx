import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser, loading } = useContext(UserContext);
  console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>
  }

  return currentUser?.authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
