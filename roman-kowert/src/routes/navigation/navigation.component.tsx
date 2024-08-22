import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";

type previewProps = string;

type previewState = {
  about: boolean;
  projects: boolean;
  resume: boolean;
};

const Navigation = () => {
  const [showPreview, setShowPreview] = useState<previewState>({
    about: false,
    projects: false,
    resume: false,
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
        <div className="flex flex-col items-start">
          <div className="hover:text-tokyoblue-500 transition-all">
            <Link to="/">
              <div className="text-6xl font-extrabold mb-2">Roman Kowert</div>
              <div className="text-2xl text-left font-bold mb-8 font-normal">
                Fullstack Web Engineer
              </div>
            </Link>
          </div>
          <div
            className="py-2 text-xl font-bold hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer"
            onMouseEnter={() => {
              handlePreview("about");
            }}
            onMouseLeave={() => {
              handlePreview("about");
            }}
          >
            <Link to="/about">About</Link>
          </div>
          <div
            className="py-2 text-xl font-bold hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer"
            onMouseEnter={() => handlePreview("projects")}
            onMouseLeave={() => {
              handlePreview("projects");
            }}
          >
            Projects
          </div>
          <div
            className="py-2 text-xl font-bold hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer"
            onMouseEnter={() => handlePreview("resume")}
            onMouseLeave={() => {
              handlePreview("resume");
            }}
          >
            Resume
          </div>
        </div>
      </div>
      <div>
        <div className="relative -mt-6">
          <div
            className={
              Object.values(showPreview).some(Boolean)
                ? "relative opacity-0 translate-y-8 transition-all"
                : "relative opacity-100 transition-all delay-100"
            }
          >
            <Outlet />
          </div>
          <div
            className={
              showPreview.about
                ? "absolute opacity-100 transition-all delay-200 -mt-60 ml-24"
                : "absolute opacity-0 -translate-y-8 transition-all -mt-60 ml-24"
            }
          >
            <p className="text-lg text-right leading-8">
              Discover more about my journey into web development, my core
              philosophies, and the principles guiding my approach to building
              the web.
            </p>
          </div>
          <div
            className={
              showPreview.projects
                ? "absolute opacity-100 transition-all delay-200 -mt-60 ml-24"
                : "absolute opacity-0 -translate-y-8 transition-all -mt-60 ml-24"
            }
          >
            <p className="text-lg text-right leading-8 italic">
              Explore my portfolio of web development projects, showcasing
              innovative solutions, clean code, and a commitment to user-centric
              design.
            </p>
          </div>
          <div
            className={
              showPreview.resume
                ? "absolute opacity-100 transition-all delay-200 -mt-60 ml-24"
                : "absolute opacity-0 -translate-y-8 transition-all -mt-60 ml-24"
            }
          >
            <p className="text-lg text-right leading-8 italic">
              Review my professional journey and qualifications through my
              comprehensive resume, highlighting my skills, experiences, and
              achievements in web development.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
