import { useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps ) => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   setUser(user);
    //   setLoading(false);
    // });

    // return () => unsubscribe();
  }, []);

  // if (loading) {
  //   return <Spinner loading={loading} />
  // }

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;

