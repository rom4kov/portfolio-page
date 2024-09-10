import { Link } from "react-router-dom";
import { Page } from "../../routes/navigation/navigation.component";


// type PageLinksProps = {
//   unblockPreview: MouseEventHandler;
//   handlePreview: (arg0: Page) => void;
//   handleLinkClicked: MouseEventHandler;
//   location: string;
// }

const DashboardNav = () => {
  return (
    <div className="flex flex-col items-start">
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
      >
        <Link to="/about">
          ABOUT
        </Link>
      </div>
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
      >
        <Link to="/projects">
          PROJECTS
        </Link>
      </div>
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer`}
      >
        <Link to="/resume">
          RESUME
        </Link>
      </div>
    </div>
  );
};

export default DashboardNav;

