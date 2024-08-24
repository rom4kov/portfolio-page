import React, { useState, useEffect } from "react";

interface ResumeProps {
  location: string;
}

const Resume: React.FC<ResumeProps> = ({ location }) => {
  const [height, setHeight] = useState("h-0 hidden");

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
      className={`${height} transition-all relative flex flex-col items-center gap-8 z-10 mb-36`}
    >
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/5 text-base h-16 rounded-lg">2024/04 - 08</span>
          <div className="w-4/5">
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
          <span className="w-1/5 text-base h-16 rounded-lg">2023/05 - 12</span>
          <div className="w-4/5">
            <h3 className="font-bold -mt-1 mb-1">
              Website for a Psychotherapist
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
          <span className="w-1/5 text-base h-16 rounded-lg">2024/04 - 08</span>
          <div className="w-4/5">
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
          <span className="w-1/5 text-base h-16 rounded-lg">2024/04 - 08</span>
          <div className="w-4/5">
            <h3 className="font-bold -mt-1 mb-1">
              Website for a Psychotherapist
            </h3>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              labore, hic, ab quisquam quam maxime excepturi nisi maiores
              perferendis nesciunt dolorum.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/5 text-base h-16 rounded-lg">2024/04 - 08</span>
          <div className="w-4/5">
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
    </div>
  );
};

export default Resume;
