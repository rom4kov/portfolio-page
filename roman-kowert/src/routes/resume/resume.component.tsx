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
      className={`${height} transition-all relative flex flex-col gap-8 z-10 mb-36`}
    >
      <h2 className="text-start text-2xl font-bold">
        Recent Work as Freelancer
      </h2>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-5">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            04/2024 - 08/2024
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-1">klavierunterricht-pye.de</h3>
            <p className="text-md">
              Stack: HTML / CSS / GatsbyJS / GraphQL / Netlify Cloud Functions
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            05/2023- 12/2023
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-1">
              brentrup-psychothrerapie.de
            </h3>
            <p className="text-md">
              Stack: React / Context API / Styled Components / Framer Motion /
              Firebase Auth / Firebase Firestore, Storage {"&"} Cloud Functions
              / SendGrid, Custom CMS
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            05/2022 - 01/2023
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-1">
              psychotherapie-lukasbielefeld.de
            </h3>
            <p className="text-md">
              Stack: HTML / CSS / Bootstrap / JS / Node / Express / MongoDB /
              EJS / Passport.js / Cloudinary / Mapbox / Webpack, Custom CMS
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-start text-2xl font-bold mt-4 -mb-2">
        Courses {"&"} Education
      </h2>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            04/2024- 2024/08
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-3 leading-6">
              Course: "100 Days of Code: The Complete Python Pro Bootcamp" by
              Dr. Angela Yu
            </h3>
            <p className="text-md">
              Python Basics: Lists, Logical Operators, Loops {"&"} Dictionaries
              / Python Functions / OOP: Python Classes {"&"} Subclasses /
              Tkinter / Flask {"&"} Jinja / Python Decorators / SQLite /
              PostgreSQL / Data Science: Pandas, Matplotlib, Plotly, NumPy,
              scikit-learn {"&"} Seaborn
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            03/2023 - 10/2023
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-1">
              Course: "Complete React Developer" by A. Neagoie {"&"} Y. Zhang
            </h3>
            <p className="text-md">
              Covered Topics: Git {"&"} GitHub / React Basics / Context API /
              Firebase / Redux / Redux Thunk / Redux Saga / Redux Toolkit /
              Stripe API / Typescript / Testing (Enzyme, Jest) / GraphQL /
              GatsbyJS / Webpack
            </p>
          </div>
        </div>
      </div>
      <div className="w-[40rem] h-fit p-5 bg-tokyo-3-500 hover:bg-tokyo-4-500 transition-all text-left text-lg rounded-lg cursor-pointer">
        <div className="flex gap-6">
          <span className="w-1/4 text-sm h-16 rounded-lg">
            03/2023 - 10/2023
          </span>
          <div className="w-3/4">
            <h3 className="font-bold -mt-1 mb-1">
              Course: "The Web Developer Bootcamp 2022" by Colt Steele
            </h3>
            <p className="text-md">
              Covered Topics: HTML / CSS / Bootstrap / JavaScript / DOM
              Manipulation / Node.js / Express.js / MongoDB / Mongoose / EJS /
              Passport.js / Schema Validation with joi / Cloudinary / Mapbox GL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
