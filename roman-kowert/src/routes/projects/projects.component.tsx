import React, { useState, useEffect } from "react";

import image from "../../assets/images/klavierunterricht.png";
import image2 from "../../assets/images/brentrup.png";
import image3 from "../../assets/images/bielefeld.png";
import image4 from "../../assets/images/ykms.png";
import image5 from "../../assets/images/wyldcamp.png";

interface ProjectsProps {
  location: string;
}

const Projects: React.FC<ProjectsProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");

  useEffect(() => {
    if (location === "/projects") {
      setTimeout(() => {
        setHeight("h-fit");
      }, 300);
    } else {
      setHeight("h-0 hidden");
    }
  }, [location]);

  return (
    <div
      className={`${height} transition-all relative flex flex-col items-center gap-8 z-10 mb-36`}
    >
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <img className="w-32 h-16 rounded-lg" src={image} alt="" />{" "}
          <div className="grow">
            <h3 className="font-bold -mt-1 mb-1">
              Website for a Piano Teacher
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              reiciendis odio possimus nihil. Esse dolorem, reprehenderit non
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <img className="w-32 h-16 rounded-lg" src={image2} alt="" />{" "}
          <div className="grow">
            <h3 className="font-bold -mt-1 mb-1">
              Website for a Psychotherapist
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              reiciendis odio possimus nihil. Esse dolorem, reprehenderit non
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <img className="w-32 h-16 rounded-lg" src={image3} alt="" />{" "}
          <div className="grow">
            <h3 className="font-bold -mt-1 mb-1">
              Website for a Psychotherapist
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              reiciendis odio possimus nihil. Esse dolorem, reprehenderit non
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <img className="w-32 h-16 rounded-lg" src={image4} alt="" />{" "}
          <div className="grow">
            <h3 className="font-bold -mt-1 mb-1">
              E-Commerce Clothing Website
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              reiciendis odio possimus nihil. Esse dolorem, reprehenderit non
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <img className="w-32 h-16 rounded-lg" src={image5} alt="" />{" "}
          <div className="grow">
            <h3 className="font-bold -mt-1 mb-1">
              Campground Review Website
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              reiciendis odio possimus nihil. Esse dolorem, reprehenderit non
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
