import React, { useState, useEffect } from "react";

interface AboutProps {
  location: string;
}

const About: React.FC<AboutProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");

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
      >
        As a Full Stack Web Developer with over two years of experience, I
        specialize in building custom, fully responsive websites using a diverse
        range of technologies. My expertise spans from frontend frameworks like
        <span className="text-tokyoblue-500">
          {" "}
          React, GatsbyJS, and Styled Components
        </span>{" "}
        to backend systems involving Node.js, MongoDB, and Firebase. I am
        passionate about creating clean, efficient code that prioritizes
        performance and user experience.
        <br />
        <br />
        Throughout my career, I've successfully delivered multiple projects,
        including{" "}
        <span className="text-tokyoblue-500">
          custom content management systems
        </span>{" "}
        and dynamic web applications. My continuous learning journey has
        equipped me with advanced skills in{" "}
        <span className="text-tokyoblue-500">
          Python, Flask, and TypeScript
        </span>
        , as well as a deep understanding of web development best practices. I
        am also well-versed in using tools like Git, Linux, and various testing
        frameworks to ensure robust and scalable applications.
        <br />
        <br />I am committed to staying at the forefront of technology,
        constantly refining my craft, and delivering impactful digital
        solutions.
      </div>
    </div>
  );
};

export default About;
