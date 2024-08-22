import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";

type previewProps = string;

type previewState = {
  about: boolean;
  projects: boolean;
  contact: boolean;
};

const Navigation = () => {
  const [showPreview, setShowPreview] = useState<previewState>({
    about: false,
    projects: false,
    contact: false,
  });

  console.log(showPreview);

  const handlePreview = (hoveredPage: previewProps) => {
    setShowPreview((prev): previewState => {
      return Object.keys(prev).reduce((acc, page) => {
        acc[page as keyof previewState] =
          page === hoveredPage ? !prev[page as keyof previewState] : false;
        return acc;
      }, {} as previewState);
    });
  };

  return (
    <Fragment>
      <div className="w-fit h-[90vh] flex items-center">
        <div className="flex flex-col items-start gap-3">
          <div className="text-6xl font-extrabold mb-1">Roman Kowert</div>
          <div className="text-2xl font-bold mb-4">Fullstack Web Engineer</div>
          <div
            className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseEnter={() => {
              handlePreview("about");
            }}
            onMouseLeave={() => {
              handlePreview("about");
            }}
          >
            About
          </div>
          <div
            className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseEnter={() => handlePreview("projects")}
            onMouseLeave={() => {
              handlePreview("projects");
            }}
          >
            Projects
          </div>
          <div
            className="text-xl font-bold hover:text-red-400 hover:translate-x-4 transition-all cursor-pointer"
            onMouseEnter={() => handlePreview("contact")}
            onMouseLeave={() => {
              handlePreview("contact");
            }}
          >
            Contact
          </div>
        </div>
      </div>
      <div>
        <div
          className={
            Object.values(showPreview).some(Boolean)
              ? "opacity-0 transition-all"
              : "opacity-100 transition-all mt-16"
          }
        >
          <Outlet />
        </div>
        <div
          className={
            showPreview.about
              ? "relative opacity-100 right-4 transition-all"
              : "opacity-0 transition-all"
          }
        >
          Preview of About Page
        </div>
          <div className={
            showPreview.projects
              ? "relative opacity-100 right-4 transition-all"
              : "opacity-0 transition-all"
          }
        >
          Preview of Projects Page
        </div>
          <div className={
            showPreview.contact
              ? "relative opacity-100 right-4 transition-all"
              : "opacity-0 transition-all"
          }>
          Preview of Contact Page
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
