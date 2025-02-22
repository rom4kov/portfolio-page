import { Page } from "../../routes/navigation/navigation.component";

type PageLinkProps = {
  linkName: Page;
  location: string;
  handlePreview: (arg0: Page) => void;
  handleLinkClicked: (to: Page) => void;
};

const PageLink = ({
  linkName,
  location,
  handlePreview,
  handleLinkClicked,
}: PageLinkProps) => {

  return (
    <div
      className={`cursor-pointer select-none py-1 text-xs xl:text-sm font-bold relative top-0 z-50 ${
        location.includes(linkName)
          ? "opacity-100 xl:pl-4 animated-gradient-link"
          : "opacity-60"
        } xl:hover:ps-4 hover:opacity-100 transition-[padding] text-white font-bold py-1 rounded hover:animated-gradient`}
      onMouseEnter={() => {
        handlePreview(linkName);
      }}
      onMouseLeave={() => {
        handlePreview(linkName);
      }}
      onClick={() => handleLinkClicked(linkName)}
    >
      {linkName.toUpperCase()}
    </div>
  );
};

export default PageLink;
