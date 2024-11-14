import { MouseEventHandler } from "react";
import { Page } from "../../routes/navigation/navigation.component";
import PageLink from "../page-link/page-link.component";

type PageLinksProps = {
  unblockPreview: MouseEventHandler;
  handlePreview: (arg0: Page) => void;
  handleLinkClicked: MouseEventHandler;
  location: string;
};

const links: Page[] = ["about", "projects", "resume"];

const PageLinks = ({
  unblockPreview,
  handlePreview,
  handleLinkClicked,
  location,
}: PageLinksProps) => {
  return (
    <div className="flex flex-col items-start" onMouseLeave={unblockPreview}>
      {links.map((link) => {
        return (
          <PageLink
            linkName={link}
            location={location}
            handlePreview={handlePreview}
            handleLinkClicked={handleLinkClicked}
          />
        );
      })}
    </div>
  );
};

export default PageLinks;
