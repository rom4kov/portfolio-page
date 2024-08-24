import { useState, useEffect, ReactNode } from "react";
import { previewState } from "../../routes/navigation/navigation.component";

type PagePreviewProps = {
  outlet: ReactNode;
  showPreview: previewState;
  location: string;
};

const PagePreviews = ({ outlet, showPreview, location }: PagePreviewProps) => {
  const [previewPostion, setPreviewPosition] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (location === "/") setPreviewPosition("absolute top-0 right-0");
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
            ? `${previewPostion} w-64 opacity-100 transition-all delay-200`
            : `${previewPostion} w-64 opacity-0 -translate-y-8 transition-all`
        }
      >
        <p className="text-lg text-right leading-8 italic select-none z-0">
          Learn more about my journey into web development, my core
          philosophies, and the principles guiding my approach to building the
          web.
        </p>
      </div>
      <div
        className={
          showPreview.projects
            ? `${previewPostion} w-64 opacity-100 transition-all delay-200 ml-24`
            : `${previewPostion} w-64 opacity-0 -translate-y-8 transition-all ml-24`
        }
      >
        <p className="text-lg text-right leading-8 italic">
          Explore my portfolio of web development projects, showcasing
          innovative solutions, clean code, and a commitment to user-centric
          {"\u00A0"}
          design.
        </p>
      </div>
      <div
        className={
          showPreview.resume
            ? `${previewPostion} w-64 opacity-100 transition-all delay-200 ml-24`
            : `${previewPostion} w-64 opacity-0 -translate-y-8 transition-all ml-24`
        }
      >
        <p className="text-lg text-right leading-8 italic">
          Review my professional journey and qualifications through my
          comprehensive resume, highlighting my skills, experiences, and
          achievements in web development.
        </p>
      </div>
    </div>
  );
};

export default PagePreviews;
