import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const Footer = () => {
  const [left, setLeft] = useState("");
  const [prevPath, setPrevPath] = useState("");
  const location = useLocation();
  const date = format(new Date(), "yyyy");

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/about") {
      if (prevPath !== "/" && prevPath !== "/about") {
        setLeft("ms-[-23%] opacity-0");
        setTimeout(() => { setLeft("opacity-[.15] translate-x-[-1rem]") }, 500);
      }; 
      setPrevPath(location.pathname);
    } else {
      if (prevPath !== "/projects" && prevPath !== "/resume") {
        setLeft("opacity-0 translate-x-[-1rem]");
        setTimeout(() => { setLeft("ms-[-23%] opacity-[.15]") }, 500);
        setPrevPath(location.pathname);
      }
    }
  }, [location]);

  return (
    <footer
      className={`fixed z-10 hover:opacity-75 bottom-[2%] ${left} w-full transition-opacity duration-[0.3s]`}
    >
      <div className="text-sm transition-opacity duration-[0.4s]">
        @ {date} · Roman Kowert ·{" "}
        <span className="hover:text-tokyo-15-500 hover:opacity-100 cursor-pointer">
          Impressum
        </span>{" "}
        ·{" "}
        <span className="hover:text-tokyo-15-500 hover:opacity-100 cursor-pointer">
          Datenschutz
        </span>
      </div>
    </footer>
  );
};

export default Footer;

