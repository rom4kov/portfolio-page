import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import PageLinks from "../../components/page-links/page-links.component";
import SocialMediaLinks from "../../components/social-media/social-media.component";
import PagePreviews from "../../components/page-previews/page-previews.component.tsx";

import useWindowSize from "../../hooks/useWindowSize.tsx";

export type previewProps = string;

export type Page = "about" | "projects" | "resume";
export type previewState = Record<Page, boolean>;

type NavigationProps = {
  location: string;
};

const Navigation = ({ location }: NavigationProps) => {
  const [showPreview, setShowPreview] = useState<previewState>({
    about: false,
    projects: false,
    resume: false,
  });

  const [linkClicked, setLinkClicked] = useState(false);
  const [titlePosition, setTitlePosition] = useState("top-12");

  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const windowWidth = useWindowSize();

  const handleLinkClicked = (to: Page) => {
    setLinkClicked(true);
    setShowPreview(
      (prev): previewState =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key as keyof previewState] = false;
          return acc;
        }, {} as previewState),
    );
    navigate(to);
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
  };

  useEffect(() => {
    let timeOut;
    switch (true) {
      case windowWidth < 768:
        timeOut = 500;
        break;
      case windowWidth >= 768:
        timeOut = 100;
        break;
      case windowWidth >= 820:
        timeOut = 1000;
        break;
      case windowWidth >= 1280:
        timeOut = 500;
        break;
      default:
        timeOut = 500;
        console.log(timeOut);
        break;
    }
    console.log(windowWidth);
    if (location === "/") {
      console.log("to home");
      setTimeout(() => {
        setTitlePosition("md:top-82 xl:top-72");
      }, 500);
    } else if (location === "/about") {
      console.log("to about");
      setTimeout(() => {
        setTitlePosition("md:top-44 ml:top-60 xl:top-28");
      }, windowWidth >= 768 && windowWidth <= 1268 ? 500 : 500);
    } else {
      console.log("to projects");
      setTimeout(() => {
        setTitlePosition("md:top-10 xl:top-20");
      }, windowWidth >= 768 && windowWidth <= 1268 ? 500 : 500);
    }
  }, [location, windowWidth]);

  return (
    <Fragment>
      {currentUser?.authenticated && (
        <div className="fixed top-5 right-5 font-extrabold">
          <Link to="/admin/dashboard">Dashboard</Link>
        </div>
      )}
      <div className="relative overflow-y-auto h-48 w-full md:w-44 xl:w-fit xl:h-fit 
                      flex items-start flex-none">
        <div
          className={`fixed h-fit xl:h-[35vh] xl:flex xl:flex-col items-start 
                      xl:items-start transition-all duration-500 
                      overflow-y-scroll`}
        >
          <div className="animated-gradient">
            <Link to="/">
              <div
                className="text-4xl lg:text-5xl xl:text-6xl text-left font-extrabold mb-1
                md:mb-3 xl:mb-2"
              >
                Roman {windowWidth >= 768 && windowWidth <= 1268 && <br />} Kowert
              </div>
              <div className="text-lg lg:text-xl xl:text-2xl text-left mb-3 xl:mb-8 font-normal">
                Fullstack Web {windowWidth >= 768 && windowWidth <= 1268 && <br />} Developer
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
      <PagePreviews
        outlet={<Outlet />}
        showPreview={showPreview}
        location={location}
      />
    </Fragment>
  );
};

export default Navigation;
