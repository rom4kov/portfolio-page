import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Occupation,
  OccupationsContext,
} from "../../contexts/occupations.context";

import { getImageURL } from "../../utils/image-util";

import CV_PDF from "../../assets/documents/Kowert_CV_Okt_2024_webdev_engl.pdf";

interface ResumeProps {
  location: string;
}

const Resume: React.FC<ResumeProps> = ({ location }) => {
  const [height, setHeight] = useState<string>("h-0 hidden");
  const { occupations } = useContext(OccupationsContext);
  const work: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "work";
  });
  const education: Occupation[] = occupations.filter((obj) => {
    return obj.occupation_type === "course";
  });

  const [certsToShow, setCertsToShow] = useState<boolean[]>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imgRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const initCertsToShow = new Array(
      occupations.filter((obj) => obj.occupation_type === "course").length,
    ).fill(false);
    setCertsToShow(initCertsToShow);
  }, [occupations]);

  useEffect(() => {
    if (location === "/resume") {
      setTimeout(() => {
        setHeight("xl:h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  const handleShowCert = (idx: number) => {
    const newCertsToShow = [...certsToShow];
    newCertsToShow[idx] = !newCertsToShow[idx];
    setCertsToShow(newCertsToShow);
    const cardElem = cardRefs.current[idx];
    if (cardElem && cardElem.style.height === "15rem") {
      cardElem.style.height = "23rem";
    } else if (cardElem && cardElem.style.height === "12.5rem") {
      cardElem.style.height = "21.5rem";
    } else if (cardElem && cardElem.style.height === "23rem") {
      cardElem.style.height = "15rem";
    } else if (cardElem && cardElem.style.height === "21.5rem") {
      cardElem.style.height = "12.5rem";
    };
    setTimeout(() => {
      const imgElem = imgRefs.current[idx];
      if (imgElem && imgElem.classList.contains("opacity-0")) { 
        imgElem.classList.remove("opacity-0");
        imgElem.classList.add("opacity-75");
      } else if (imgElem && imgElem.classList.contains("opacity-75")) {
        imgElem.classList.remove("opacity-75");
        imgElem.classList.add("opacity-0");
      };
    }, 200);
  };

  return (
    <div
      id="resume-route-container"
      className={`${height} xl:w-full xl:w-[35rem] transition-all relative flex flex-col gap-8 xl:mb-16 ml-auto overflow-y-auto xl:overflow-y-visible`}
    >
      <div className="w-full -mb-6 xl:w-[35rem] relative flex gap-6 items-end xs:items-start justify-between">
        <h3 className="mt-1 text-xl text-start text-[#ffffffb5] font-bold">
          RECENT WORK EXPERIENCE
        </h3>
        <a
          className="w-16 xl:w-48 mb-[0.1rem] text-[0.6rem] xl:text-xs text-right mt-2 hover:text-tokyo-15-500 transition-colors duration-200"
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
            className={`xl:w-[35rem] transition-all duration-300 p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 text-left text-lg rounded-lg cursor-pointer`}
            ref={(el) => (cardRefs.current[idx] = el)}
            style={{ height: `${course.description.length < 250 ? '12.5rem' : '15rem'}`}}
          >
            <div className="flex flex-col xl:flex-row gap-5">
              <span className="xl:w-1/4 text-xs h-2 xl:h-16 rounded-lg">
                {course.time_period}
              </span>
              <div className="relative xl:w-3/4 h-full">
                <h3 className="text-base !leading-6 xl:text-lg font-bold -mt-1 mb-2 xl:mb-2">
                  {course.title}
                </h3>
                <p className={`me-auto mb-2 text-sm ${certsToShow[idx] ? `hidden opacity-0` : `opacity-100`} font-bold transition-opacity delay-200`}>
                  Instructor(s): {course.instructor}
                </p>
                <div
                  className={`courses-list text-base ${certsToShow[idx] ? `hidden opacity-0` : `opacity-100`} transition-all duration-300 cursor-pointer`}
                  dangerouslySetInnerHTML={{ __html: course.description }}
                  onClick={() => {
                    handleShowCert(idx);
                  }}
                />
                <img
                  ref={(el) => (imgRefs.current[idx] = el)}
                  className={`mt-4 w-full h-full ${certsToShow[idx] ? `` : `hidden`} transition-all duration-200 object-contain opacity-0 rounded-lg`}
                  src={getImageURL("certificate-java-programming-i.png")}
                  onClick={() => {
                    handleShowCert(idx);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Resume;
