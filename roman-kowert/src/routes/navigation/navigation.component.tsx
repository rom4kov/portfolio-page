import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";

import PageLinks from "../../components/page-links/page-links.component";
import SocialMediaLinks from "../../components/social-media/social-media.component";
import PagePreviews from "../../components/page-previews/page-previews.component.tsx";

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
  };

  useEffect(() => {
    if (location === "/") {
      setTitlePosition("top-72");
    } else if (location === "/about") {
      setTitlePosition("top-28");
      setTimeout(() => {
        setTitlePosition("top-28");
      }, 500);
    } else {
      setTitlePosition("top-20");
      setTimeout(() => {
        setTitlePosition("top-20");
      }, 500);
    }
  }, [location]);

  return (
    <Fragment>
      <div className="overflow-y-auto w-fit h-fit flex items-center">
        <div className={`fixed flex flex-col items-start ${titlePosition} transition-all duration-500`}>
          <div className="hover:text-tokyoblue-500 transition-all duration-300">
            <Link to="/">
              <div className="text-6xl font-extrabold mb-2">Roman Kowert</div>
              <div className="text-2xl text-left mb-8 font-normal">
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
      <PagePreviews
        outlet={<Outlet />}
        showPreview={showPreview}
        location={location}
      />
    </Fragment>
  );
};

export default Navigation;
