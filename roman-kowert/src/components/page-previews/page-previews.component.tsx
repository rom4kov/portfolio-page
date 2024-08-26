import { useState, useEffect, ReactNode } from "react";
import { previewState } from "../../routes/navigation/navigation.component";

import projectsPreview from "../../assets/images/projects_preview_mono.png";
import asciiAvatar from "../../assets/images/ascii-art_edit3.png";
import resumePreview from "../../assets/images/resume_preview3.png";

type PagePreviewProps = {
  outlet: ReactNode;
  showPreview: previewState;
  location: string;
};

const PagePreviews = ({ outlet, showPreview, location }: PagePreviewProps) => {
  const [previewPostion, setPreviewPosition] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (location === "/") setPreviewPosition("absolute right-0");
      else if (location === "/about") setPreviewPosition("fixed top-[10rem] right-[28rem]");
      else setPreviewPosition("fixed top-[5.5rem] right-[28rem]");
    }, 500);
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
            ? `${previewPostion} opacity-100 transition-all delay-200`
            : `${previewPostion} opacity-0 -translate-y-8 transition-all`
        }
      >
        <img src={asciiAvatar} alt="" className="w-[19rem] h-[19rem]" />
      </div>
      <div
        className={
          showPreview.projects
            ? `${previewPostion} opacity-100 transition-all delay-200 ml-24`
            : `${previewPostion} opacity-0 -translate-y-8 transition-all ml-24`
        }
      >
        <img src={projectsPreview} alt="" className="w-[24rem] h-[18rem] mt-2" />
      </div>
      <div
        className={
          showPreview.resume
            ? `${previewPostion} w-64 opacity-100 transition-all delay-200 ml-24`
            : `${previewPostion} w-64 opacity-0 -translate-y-8 transition-all ml-24`
        }
      >
        <img src={resumePreview} alt="" className="w-[13rem] h-[18rem] mt-2" />
      </div>
    </div>
  );
};

export default PagePreviews;
