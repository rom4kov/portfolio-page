import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

type previewProps = string;

const Navigation = () => {
  const [showPreview, setShowPreview] = useState({
    about: false,
    project: false,
    contact: false,
  });

  const handlePreview = (page: previewProps) => {
    console.log(page);
  };

  return (
    <Fragment>
      <div className="w-fit h-[90vh] flex items-center">
        <div className="flex flex-col items-start gap-3">
          <div className="text-6xl font-extrabold mb-1">Roman Kowert</div>
          <div className="text-2xl font-bold mb-4">Fullstack Web Engineer</div>
          <div
            className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseOver={() => handlePreview("about")}
          >
            About{}
          </div>
          <div className="hidden">Preview of About Page</div>
          <div
            className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseOver={() => handlePreview("projects")}
          >
            Projects
          </div>
          <div className="hidden">Preview of Projects Page</div>
          <div className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseOver={() => handlePreview("contact")}
          >
            Contact
          </div>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
