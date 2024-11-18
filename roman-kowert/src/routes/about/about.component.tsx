import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { TextElement, TextContext, TextContextType } from "../../contexts/text.context";

interface AboutProps {
  location: string;
}

const About: React.FC<AboutProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");
  const { texts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "about";
  }) as TextElement;

  useEffect(() => {
    if (location === "/about") {
      setTimeout(() => {
        setHeight("xl:h-[72vh] xl:h-fit");
      }, 500);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div className="flex" id="about-route-container">
      <div
        className={`${height} xl:w-[40rem] text-lg text-left xl:text-right xl:leading-10 overflow-y-scroll`}
        dangerouslySetInnerHTML={{ __html: value?.body }}
      />
    </div>
  );
};

export default About;
