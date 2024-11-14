import { Link } from "react-router-dom";
import { Page } from "../../routes/navigation/navigation.component";
import { MouseEventHandler } from "react";

type PageLinkProps = {
  linkName: Page;
  location: string;
  handlePreview: (arg0: Page) => void;
  handleLinkClicked: MouseEventHandler;
};

const PageLink = ({
  linkName,
  location,
  handlePreview,
  handleLinkClicked,
}: PageLinkProps) => {
  console.log(location);
  return (
    <div
      className={`py-1 text-sm font-bold relative top-0 z-50 ${
        location.includes(linkName)
          ? "opacity-100 pl-4 animated-gradient-link"
          : "opacity-60"
      } hover:ps-4 hover:opacity-100 transition-[padding] text-white font-bold py-1 rounded hover:animated-gradient`}
      onMouseEnter={() => {
        handlePreview(linkName);
      }}
      onMouseLeave={() => {
        handlePreview(linkName);
      }}
    >
      <Link
        className="py-3 pe-3"
        to={`/${linkName}`}
        onClick={handleLinkClicked}
      >
        {linkName.toUpperCase()}
      </Link>
    </div>
  );
};

export default PageLink;
