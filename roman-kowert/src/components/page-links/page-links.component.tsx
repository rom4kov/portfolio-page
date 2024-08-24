import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Page } from "../../routes/navigation/navigation.component";


type PageLinksProps = {
  unblockPreview: MouseEventHandler;
  handlePreview: (arg0: Page) => void;
  handleLinkClicked: MouseEventHandler;
  location: string;
}

const PageLinks = ({ unblockPreview, handlePreview, handleLinkClicked, location }: PageLinksProps) => {
  return (
    <div className="flex flex-col items-start" onMouseLeave={unblockPreview}>
      <div
        className={`py-1 text-lg font-bold ${
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
        className={`py-1 text-lg font-bold ${
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
        className={`py-1 text-lg font-bold ${
          location === "/resume" ? "text-tokyoblue-500 pl-4" : ""
        } hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
        onMouseEnter={() => handlePreview("resume")}
        onMouseLeave={() => {
          handlePreview("resume");
        }}
      >
        <Link to="/resume" onClick={handleLinkClicked}>
          Resume
        </Link>
      </div>
    </div>
  );
};

export default PageLinks;
