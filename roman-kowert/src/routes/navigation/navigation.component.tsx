import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="container max-w-screen-2xl flex flex-col items-start gap-3">
        <div>Roman Kowert</div>
        <div>About</div>
        <div>Contact</div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
