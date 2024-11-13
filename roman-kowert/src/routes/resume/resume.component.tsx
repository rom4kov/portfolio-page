import React, { useState, useEffect, useContext } from "react";
import {
  Occupation,
  OccupationsContext,
} from "../../contexts/occupations.context";

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
        setHeight("h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div
      id="route-container"
      className={`${height} w-[35rem] transition-all relative flex flex-col gap-8 mb-36 ml-auto`}
    >
      <h2 className="text-start text-2xl font-bold">
        Recent Work as Freelancer
      </h2>
      {work.reverse().map((work) => {
        return (
          <div className="w-[35rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
            <div className="flex gap-5">
              <span className="w-1/4 text-xs h-16 rounded-lg">
                {work.time_period}
              </span>
              <div className="w-3/4">
                <h3 className="text-lg font-bold -mt-1 mb-1">{work.title}</h3>
                <div
                  className="occupation-list"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
      <h2 className="text-start text-2xl font-bold mt-4 -mb-2">
        Courses {"&"} Education
      </h2>
      {education.reverse().map((course) => {
        return (
          <div className="w-[35rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
            <div className="flex gap-5">
              <span className="w-1/4 text-xs h-16 rounded-lg">
                {course.time_period}
              </span>
              <div className="w-3/4">
                <h3 className="text-lg font-bold -mt-1 mb-1">{course.title}</h3>
                <div
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
