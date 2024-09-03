import { useState, useEffect, Children } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: typeof Children
}

const PrivateRoute = ({ children }: PrivateRouteProps ) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;

