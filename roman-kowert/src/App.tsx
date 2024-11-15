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

import FlashMessage from "./components/flash-message/flash.component";
import GlowCursor from "./components/glow-cursor/glow-cursor.component";

import "./App.css";

function App() {
  const projectRoutePattern = /^\/projects\/\d+$/;
  useScrollRestoration(projectRoutePattern, "/projects");

  const [contentPosition, setContentPosition] = useState("top-64");
  const [maxWidth, setMaxWidth] = useState("max-w-[950px]");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setContentPosition("top-64");
      setTimeout(() => {
        setMaxWidth("max-w-[950px]")
      }, 500);
    } else if (location.pathname === "/about") {
      setMaxWidth("max-w-screen-xl")
      setTimeout(() => {
        setContentPosition(`top-20`);
      }, 500);
    } else {
      setMaxWidth("max-w-screen-xl")
      setTimeout(() => {
        setContentPosition("top-12");
      }, 500);
    }
  }, [location]);

  return (
    <div>
      <div
        id="app-root"
        className={`flex justify-between ${contentPosition} ${maxWidth} transition-all duration-500 relative`}
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
