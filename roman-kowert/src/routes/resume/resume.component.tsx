import React, { useState, useEffect, useContext } from "react";
import {
  Occupation,
  OccupationsContext,
} from "../../contexts/occupations.context";

import CV_PDF from "../../assets/documents/Kowert_CV_Okt_2024_webdev_engl.pdf"

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
      className={`${height} xl:w-full transition-all relative flex flex-col gap-8 xl:mb-16 ml-auto overflow-y-scroll xl:overflow-y-visible`}
    >
      <div className="w-full flex justify-between -mb-5">
        <h2 className="text-start text-lg xl:text-2xl font-bold xl:-mb-2">
          Recent Work as Freelancer
        </h2>
        <a
          className="w-12 xl:w-20 text-[0.6rem] xl:text-xs text-right mt-2 hover:text-tokyo-15-500 transition-colors duration-200"
          href={CV_PDF}
        >
          Dowload as PDF
        </a>
      </div>
      {work.reverse().map((work) => {
        return (
          <div className="w-full xl:w-[35rem] xl:h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-sm xl:text-lg rounded-lg cursor-pointer">
            <div className="w-full flex flex-col xl:flex-row gap-1 xl:gap-5">
              <span className="xl:w-1/4 xl:h-16 mb-2 text-xs rounded-lg">
                {work.time_period}
              </span>
              <div className="xl:w-3/4">
                <h3 className="text-base text-lg font-bold -mt-1 mb-1">{work.title}</h3>
                <div
                  className="occupation-list"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
      <h2 className="text-start text-2xl font-bold mt-4 -mb-4 xl:-mb-2">
        Courses {"&"} Education
      </h2>
      {education.reverse().map((course) => {
        return (
          <div className="xl:w-[35rem] xl:h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
            <div className="flex flex-col xl:flex-row gap-5">
              <span className="xl:w-1/4 text-xs h-2 xl:h-16 rounded-lg">
                {course.time_period}
              </span>
              <div className="xl:w-3/4">
                <h3 className="text-base xl:text-lg font-bold -mt-1 mb-2 xl:mb-1">{course.title}</h3>
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
