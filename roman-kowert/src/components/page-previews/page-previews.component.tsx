import { useState, useEffect, ReactNode } from "react";
import { previewState } from "../../routes/navigation/navigation.component";

import projectsPreview from "../../assets/images/projects_preview_mono.png";
import asciiAvatar from "../../assets/images/ascii-art_edit4.png";
import resumePreview from "../../assets/images/resume_preview3.png";

type PagePreviewProps = {
  outlet: ReactNode;
  showPreview: previewState;
  location: string;
};

const PagePreviews = ({ outlet, showPreview, location }: PagePreviewProps) => {
  const [previewPostion, setPreviewPosition] = useState("");

  useEffect(() => {
    if (location === "/") setPreviewPosition("absolute");
      else if (location === "/about") setPreviewPosition("fixed");
        else setPreviewPosition("fixed");
  }, [location]);

  return (
    <div className="relative w-[30vw] flex justify-end items-start inline-block">
      <div className="relative invisible h-[25vh]"></div>
      <div
        className={
          Object.values(showPreview).some(Boolean)
            ? "absolute top-0 right-0 h-fit opacity-0 translate-y-8 transition-all"
            : "absolute top-0 right-0 h-fit opacity-100 transition-all delay-100"
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
        <img src={asciiAvatar} alt="" className="w-[19rem] h-[19rem]" />
      </div>
      <div
        className={
          showPreview.projects
            ? `${previewPostion} opacity-100 transition-opacity duration-200`
            : `${previewPostion} opacity-0 transition-opacity duration-200`
        }
      >
        <img src={projectsPreview} alt="" className="w-[24rem] h-[18rem] mt-2" />
      </div>
      <div
        className={
          showPreview.resume
            ? `${previewPostion} opacity-100 transition-opacity duration-200`
            : `${previewPostion} opacity-0 transition-opacity duration-200`
        }
      >
        <img src={resumePreview} alt="" className="w-[13rem] h-[18rem] mt-2" />
      </div>
    </div>
  );
};

export default PagePreviews;
