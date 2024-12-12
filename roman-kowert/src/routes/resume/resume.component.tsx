import React, { useState, useEffect, useContext } from "react";
import {
  Occupation,
  OccupationsContext,
} from "../../contexts/occupations.context";

import CV_PDF from "../../assets/documents/Kowert_CV_Okt_2024_webdev_engl.pdf";

interface ResumeProps {
  location: string;
}

const Resume: React.FC<ResumeProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");
  const { occupations } = useContext(OccupationsContext);
  const work: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "work";
  });
  const education: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "course";
  });

  useEffect(() => {
    if (location === "/resume") {
      setTimeout(() => {
        setHeight("xl:h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div
      id="resume-route-container"
      className={`${height} xl:w-full xl:w-[35rem] transition-all relative flex flex-col gap-8 xl:mb-16 ml-auto overflow-y-auto xl:overflow-y-visible`}
    >
      <div className="w-full xl:w-[35rem] relative flex gap-6 items-start justify-between -mb-6 xl:-mb-2">
        <h3 className="mt-1 -mb-6 text-xl text-start text-[#ffffffb5] font-bold">
          RECENT WORK AS FREELANCER
        </h3>
        <a
          className="w-16 xl:w-48 text-[0.6rem] xl:text-xs text-right mt-2 hover:text-tokyo-15-500 transition-colors duration-200"
          href={CV_PDF}
          title="Download CV as PDF"
        >
          Dowload CV as PDF
        </a>
      </div>
      <hr className="text-tokyo-15-500 w-full xl:w-[35rem]" />
      {work.reverse().map((work, idx) => {
        return (
          <div
            key={idx}
            className="w-full xl:w-[35rem] xl:h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-sm xl:text-lg rounded-lg cursor-pointer"
          >
            <div className="w-full flex flex-col xl:flex-row gap-1 xl:gap-5">
              <span className="xl:w-1/4 xl:h-16 mb-2 text-xs rounded-lg">
                {work.time_period}
              </span>
              <div className="xl:w-3/4">
                <h3 className="text-base text-lg font-bold -mt-1 mb-1">
                  {work.title}
                </h3>
                <div
                  className="occupation-list"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
      <h3 className="mt-12 -mb-6 text-xl text-start text-[#ffffffb5] font-bold">
        COURSES {"&"} EDUCATION
      </h3>
      <hr className="text-tokyo-15-500 w-full xl:w-[35rem]" />
      {education.reverse().map((course, idx) => {
        return (
          <div
            key={idx}
            className="xl:w-[35rem] xl:h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer"
          >
            <div className="flex flex-col xl:flex-row gap-5">
              <span className="xl:w-1/4 text-xs h-2 xl:h-16 rounded-lg">
                {course.time_period}
              </span>
              <div className="xl:w-3/4">
                <h3 className="text-base !leading-6 xl:text-lg font-bold -mt-1 mb-2 xl:mb-2">
                  {course.title}
                </h3>
                <p className="me-auto mb-2 text-sm font-bold">
                  Instructor(s): {course.instructor}
                </p>
                <div
                  className="courses-list text-base"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Resume;
