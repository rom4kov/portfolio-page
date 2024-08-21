import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div className="w-fit h-[90vh] flex items-center">
        <div className="flex flex-col items-start gap-3">
          <div className="text-5xl font-extrabold mb-4">Roman Kowert</div>
          <div className="text-xl font-bold">About</div>
          <div className="text-xl font-bold">Projects</div>
          <div className="text-xl font-bold">Contact</div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
