import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";

import PageLinks from "../../components/page-links/page-links.component";
import SocialMediaLinks from "../../components/social-media/social-media.component";

export type previewProps = string;

export type Page = "about" | "projects" | "resume";
type previewState = Record<Page, boolean>;

type NavigationProps = {
  location: string;
}

const Navigation= ({ location }: NavigationProps) => {
  const [showPreview, setShowPreview] = useState<previewState>({
    about: false,
    projects: false,
    resume: false,
  });
  const [linkClicked, setLinkClicked] = useState(false);
  const [titlePosition, setTitlePosition] = useState("");

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

  const handlePreview = (hoveredPage: Page) => {
    if (!linkClicked) {
      setShowPreview((prev): previewState => {
        return Object.keys(prev).reduce((acc, page) => {
          acc[page as keyof previewState] =
            page === hoveredPage ? !prev[page as keyof previewState] : false;
          return acc;
        }, {} as previewState);
      });
    }
  };

  const unblockPreview = () => {
    setLinkClicked(false);
    console.log(linkClicked);
  };

  useEffect(() => {
    if (location === "/") {
      setTitlePosition("");
    } else {
      setTimeout(() => {
        setTitlePosition(location === "/" ? "" : "fixed top-20");
      }, 500);
    }
  }, [location]);

  return (
    <Fragment>
      <div className="w-fit h-fit flex items-center">
        <div className={`flex flex-col items-start ${titlePosition}`}>
          <div className="hover:text-tokyoblue-500 transition-all">
            <Link to="/">
              <div className="text-6xl font-extrabold mb-2">Roman Kowert</div>
              <div className="text-2xl text-left font-bold mb-8 font-normal">
                Fullstack Web Engineer
              </div>
            </Link>
          </div>
          <PageLinks
            unblockPreview={unblockPreview}
            handlePreview={handlePreview}
            handleLinkClicked={handleLinkClicked}
            location={location}
          />
          <SocialMediaLinks />
        </div>
      </div>
      <div className="relative w-[30vw] flex justify-end items-start inline-block">
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
              ? "top-24 right-96 w-64 opacity-100 transition-all delay-200"
              : "top-24 right-96 w-64 opacity-0 -translate-y-8 transition-all"
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
            {"\u00A0"}
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
