import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import About from "./routes/about/about.component";
import Projects from "./routes/projects/projects.component";
import Resume from "./routes/resume/resume.component";
import Admin from "./routes/admin/admin.component";
import PrivateRoute from "./routes/private-route/private-route.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import DashboardHome from "./routes/dashboard/dashboard-home.component";

import GlowCursor from "./components/glow-cursor/glow-cursor.component";

import "./App.css";

function App() {
  const [contentPosition, setContentPosition] = useState("top-64");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setContentPosition("top-64");
    } else if (location.pathname === "/about") {
      setContentPosition(`top-20`);
    } else {
      setContentPosition("top-12");
    }
  }, [location]);

  return (
    <div
      id="app-root"
      className={`flex justify-between ${contentPosition} transition-all duration-500 relative`}
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
          />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
