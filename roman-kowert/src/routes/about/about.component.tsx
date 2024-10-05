import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { TextElement, TextContext, TextContextType } from "../../contexts/text.context";

interface AboutProps {
  location: string;
}

const About: React.FC<AboutProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");
  const { texts, setTexts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "about";
  }) as TextElement;
  console.log(value);

  useEffect(() => {
    if (location === "/about") {
      setTimeout(() => {
        setHeight("h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div className="flex" id="route-container">
      <div
        className={`${height} transition-all w-[40rem] text-lg text-right leading-10`}
        dangerouslySetInnerHTML={{ __html: value?.body }}
      />
    </div>
  );
};

export default About;
