import { Link, useLocation } from "react-router-dom";

type DashboardNavProps = {
  handleLogout: () => Promise<void>,
}

const DashboardNav = ({ handleLogout }: DashboardNavProps) => {
  const { pathname } = useLocation();

  return (
    <div className="ms-1 flex flex-col items-start h-full">
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
        <Link to="/">BACK TO WEBSITE</Link>
      </div>
      <button className="h-12 mt-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardNav;
