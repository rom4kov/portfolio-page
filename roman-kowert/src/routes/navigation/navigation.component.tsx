import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";

type previewProps = string;

type previewState = {
  about: boolean;
  projects: boolean;
  resume: boolean;
};

interface NavigationProps {
  location: string;
}

const Navigation: React.FC<NavigationProps> = ({ location }) => {
  const [showPreview, setShowPreview] = useState<previewState>({
    about: false,
    projects: false,
    resume: false,
  });
  const [linkClicked, setLinkClicked] = useState(false);

  const handleLinkClicked = () => {
    setLinkClicked(true);
    setShowPreview(
      (prev): previewState =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key as keyof previewState] = false;
          return acc;
        }, {} as previewState),
    );
  };

  const handlePreview = (hoveredPage: previewProps) => {
    if (!linkClicked) {
      setShowPreview((prev): previewState => {
        return Object.keys(prev).reduce((acc, page) => {
          acc[page as keyof previewState] =
            page === hoveredPage ? !prev[page as keyof previewState] : false;
          return acc;
        }, {} as previewState);
      });
    } else {
      setTimeout(() => {
        setLinkClicked(false);
      }, 500);
    }
  };

  return (
    <Fragment>
      <div className="w-fit h-fit flex items-center">
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
            className={`py-2 text-xl font-bold ${
              location === "/about" ? "text-tokyoblue-500 pl-4" : ""
            } hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
            onMouseEnter={() => {
              handlePreview("about");
            }}
            onMouseLeave={() => {
              handlePreview("about");
            }}
          >
            <Link to="/about" onClick={handleLinkClicked}>
              About
            </Link>
          </div>
          <div
            className={`py-2 text-xl font-bold ${
              location === "/projects" ? "text-tokyoblue-500 pl-4" : ""
            } hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
            onMouseEnter={() => handlePreview("projects")}
            onMouseLeave={() => {
              handlePreview("projects");
            }}
          >
            <Link to="/projects" onClick={handleLinkClicked}>
              Projects
            </Link>
          </div>
          <div
            className={`py-2 text-xl font-bold ${
              location === "/resume" ? "text-tokyoblue-500 pl-4" : ""
            } hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
            onMouseEnter={() => handlePreview("resume")}
            onMouseLeave={() => {
              handlePreview("resume");
            }}
          >
            Resume
          </div>
        </div>
      </div>
      <div className="relative w-[30vw] flex items-center inline-block">
        <div className="relative invisible h-[25vh]"></div>
        <div
          className={
            Object.values(showPreview).some(Boolean)
              ? "absolute top-0 right-0 h-fit opacity-0 translate-y-8 transition-all"
              : "absolute top-0 right-0 h-fit opacity-100 transition-all delay-100"
          }
        >
          <Outlet />
        </div>
        <div
          className={
            showPreview.about
              ? "absolute top-0 right-0 w-64 opacity-100 transition-all delay-200 ml-24"
              : "absolute top-0 right-0 w-64 opacity-0 -translate-y-8 transition-all ml-24"
          }
        >
          <p className="text-lg text-right leading-8 italic select-none z-0">
            Learn more about my journey into web development, my core
            philosophies, and the principles guiding my approach to building the
            web.
          </p>
        </div>
        <div
          className={
            showPreview.projects
              ? "absolute top-0 right-0 w-64 opacity-100 transition-all delay-200 ml-24"
              : "absolute top-0 right-0 w-64 opacity-0 -translate-y-8 transition-all ml-24"
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
              ? "absolute top-0 right-0 w-64 opacity-100 transition-all delay-200 ml-24"
              : "absolute top-0 right-0 w-64 opacity-0 -translate-y-8 transition-all ml-24"
          }
        >
          <p className="text-lg text-right leading-8 italic">
            Review my professional journey and qualifications through my
            comprehensive resume, highlighting my skills, experiences, and
            achievements in web development.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
