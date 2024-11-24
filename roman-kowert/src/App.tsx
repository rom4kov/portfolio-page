import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import About from "./routes/about/about.component";
import Projects from "./routes/projects/projects.component";
import ProjectFeatures from "./routes/project-features/project-features.component";
import Resume from "./routes/resume/resume.component";
import Admin from "./routes/admin/admin.component";
import PrivateRoute from "./routes/private-route/private-route.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import DashboardHome from "./routes/dashboard/dashboard-home.component";
import DashboardAbout from "./routes/dashboard/dashboard-about.component";
import DashboardProjects from "./routes/dashboard/dashboard-projects";
import DashboardResume from "./routes/dashboard/dashboard-resume";

import useScrollRestoration from "./hooks/useScrollRestoration";
import useWindowSize from "./hooks/useWindowSize";

import FlashMessage from "./components/flash-message/flash.component";
import GlowCursor from "./components/glow-cursor/glow-cursor.component";

import "./App.css";

function App() {
  const projectRoutePattern = /^\/projects\/\d+$/;
  useScrollRestoration(projectRoutePattern, "/projects");

  const [contentPosition, setContentPosition] = useState("xl:top-64");
  const [maxWidth, setMaxWidth] = useState("md:max-w-screen-md xl:max-w-[950px]");

  const location = useLocation();

  const windowWidth = useWindowSize();

  console.log('API URL:', process.env.REACT_APP_API_URL);


  useEffect(() => {
    if (location.pathname === "/") {
      setContentPosition("md:top-[30vh] lg:top-[33vh] xl:top-64");
      setTimeout(() => {
        setMaxWidth("md:max-w-[77.5vw] lg:max-w-[65vw] xl:max-w-[950px] sp:max-w-[65vw] ls:top-28")
      }, 500);
    } else if (location.pathname === "/about") {
      setMaxWidth("md:max-w-[90vw] xl:max-w-screen-xl")
      setTimeout(() => {
        setContentPosition(`md:top-36 ml:top-56 xl:top-20 sp:top-72 ls:top-3`);
      }, 500);
    } else {
      setMaxWidth("md:max-w-screen-md lg:max-w-[90vw] xl:max-w-screen-xl sp:max-w-[90vw]")
      setTimeout(() => {
        setContentPosition("md:top-2 xl:top-12 ls:top-3");
      }, 500);
    }
  }, [location, windowWidth]);

  return (
    <div>
      <div
        id="app-root"
        className={`h-screen md:h-fit flex flex-col md:flex-row md:justify-between 
              ${contentPosition} ${maxWidth} transition-all duration-500 relative`}
      >
        <GlowCursor />
        <Routes>
          <Route path="/" element={<Navigation location={location.pathname} />}>
            <Route index element={<Home />} />
            <Route
              path="about"
              element={<About location={location.pathname} />}
            />
            <Route
              path="projects"
              element={<Projects location={location.pathname} />}
            >
              <Route path=":projectFeature" element={<ProjectFeatures />} />
            </Route>
            <Route
              path="resume"
              element={<Resume location={location.pathname} />}
            />
          </Route>
          <Route path="admin" element={<Admin />} />
          <Route
            path="admin/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="about" element={<DashboardAbout />} />
            <Route path="projects" element={<DashboardProjects />} />
            <Route path="resume" element={<DashboardResume />} />
          </Route>
        </Routes>
      </div>
      <FlashMessage />
    </div>
  );
}

export default App;
