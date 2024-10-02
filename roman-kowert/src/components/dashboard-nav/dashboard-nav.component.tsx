import { Link, useLocation } from "react-router-dom";

const DashboardNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col items-start">
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer 
          ${pathname === "/admin/dashboard" ? "text-tokyoblue-500 pl-4" : ""}`}
      >
        <Link to="/admin/dashboard">HOME</Link>
      </div>
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer 
          ${pathname === "/admin/dashboard/about" ? "text-tokyoblue-500 pl-4" : ""}`}
      >
        <Link to="/admin/dashboard/about">ABOUT</Link>
      </div>
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer
          ${pathname === "/admin/dashboard/projects" ? "text-tokyoblue-500 pl-4" : ""}`}
      >
        <Link to="/admin/dashboard/projects">PROJECTS</Link>
      </div>
      <div
        className={`py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer
          ${pathname === "/admin/dashboard/resume" ? "text-tokyoblue-500 pl-4" : ""}`}
      >
        <Link to="/admin/dashboard/resume">RESUME</Link>
      </div>
      <div
        className={"mt-5 py-1 text-sm font-bold relative top-0 z-50 hover:text-tokyoblue-500 hover:pl-4 transition-all cursor-pointer"}
      >
        <Link to="/">GO BACK TO WEBSITE</Link>
      </div>
    </div>
  );
};

export default DashboardNav;
