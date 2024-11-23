import { useState, useEffect, ReactNode } from "react";
import { previewState } from "../../routes/navigation/navigation.component";

import projectsPreview from "../../assets/images/projects_preview_mono.png";
import asciiAvatar from "../../assets/images/ascii-art_edit4.png";
import resumePreview from "../../assets/images/resume7.png";

type PagePreviewProps = {
  outlet: ReactNode;
  showPreview: previewState;
  location: string;
};

const PagePreviews = ({ outlet, showPreview, location }: PagePreviewProps) => {
  const [previewPostion, setPreviewPosition] = useState("");

  useEffect(() => {
    if (location === "/") setPreviewPosition("absolute pointer-events-none");
    else if (location === "/about") setPreviewPosition("fixed pointer-events-none");
    else setPreviewPosition("fixed pointer-events-none");
  }, [location]);

  return (
    <div className="relative w-[85vw] lg:w-[65vw] xl:w-[40vw] 2xl:w-[30vw] lg:ms-8 xl:ms-0 pb-8 xl:flex-none flex justify-end items-start inline-block overflow-y-auto xl:overflow-y-visible">
      <div className="relative invisible h-[25vh]"></div>
      <div
        className={
          Object.values(showPreview).some(Boolean)
            ? "xl:absolute top-0 xl:right-0 w-full xl:h-fit opacity-0 translate-y-8 transition-all overflow-y-auto xl:overflow-y-visible flex-grow"
            : "xl:absolute top-0 xl:right-0 w-full xl:w-fit xl:h-fit opacity-100 transition-all delay-100 overflow-y-auto xl:overflow-y-visible flex-grow"
        }
      >
        {outlet}
      </div>
      <div
        className={
          showPreview.about
            ? `${previewPostion} opacity-100 transition-opacity duration-200`
            : `${previewPostion} opacity-0 transition-opacity duration-200`
        }
      >
        <img src={asciiAvatar} alt="" className="w-[17.5rem] h-[17.5rem]" />
      </div>
      <div
        className={
          showPreview.projects
            ? `${previewPostion} opacity-100 transition-opacity duration-200`
            : `${previewPostion} opacity-0 transition-opacity duration-200`
        }
      >
        <img
          src={projectsPreview}
          alt=""
          className="w-[22rem] h-[17rem] mt-2"
        />
      </div>
      <div
        className={
          showPreview.resume
            ? `${previewPostion} opacity-100 transition-opacity duration-200`
            : `${previewPostion} opacity-0 transition-opacity duration-200`
        }
      >
        <img src={resumePreview} alt="" className="w-[12rem] h-[17rem] mt-2" />
      </div>
    </div>
  );
};

export default PagePreviews;
