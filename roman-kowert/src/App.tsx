import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import About from "./routes/about/about.component";
import Projects from "./routes/projects/projects.component";
import Resume from "./routes/resume/resume.component";
import GlowCursor from "./components/glow-cursor/glow-cursor.component";
import axios from "axios";
import "./App.css";

function App() {
  const [contentPosition, setContentPosition] = useState("top-72");
  const [fullPageHeight, setFullPageHeight] = useState("60vh");

  // const [count, setCount] = useState(0);
  // const [array, setArray] = useState([]);

  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      setFullPageHeight("60vh");
      setContentPosition("top-72");
    } else if (location.pathname === "/about") {
      setTimeout(() => {
        setFullPageHeight(`${document.documentElement.scrollHeight}px`);
      }, 500);
      setContentPosition(`top-32`);
    } else {
      setTimeout(() => {
        setFullPageHeight(`${document.documentElement.scrollHeight}px`);
      }, 500);
      setContentPosition("top-12");
    }
  }, [location]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    console.log(response.data.users);
    // setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // useEffect(() => {
  //   const capture = document.querySelector(".glow-capture");
  //
  //   if (capture) {
  //     // capture.style.height = document.documentElement.scrollHeight.toString() + "px";
  //     const overlay = capture.querySelector(".glow-overlay");
  //
  //     (capture as HTMLBodyElement).addEventListener("mousemove", (event) => {
  //       const mouseEvent = event as MouseEvent;
  //       const x = mouseEvent.pageX;
  //       const y = mouseEvent.pageY;
  //
  //       if (overlay) {
  //         (overlay as HTMLElement).style.setProperty("--glow-x", `${x}px`);
  //         (overlay as HTMLElement).style.setProperty("--glow-y", `${y}px`);
  //         (overlay as HTMLElement).style.setProperty("--glow-opacity", "1");
  //         (overlay as HTMLElement).style.setProperty("height", fullPageHeight);
  //       }
  //     });
  //   }
  // }, [location, fullPageHeight]);

  // const handleMouseMove = (event: MouseEvent) => {
  //   const x = event.pageX;
  //   const y = event.pageY;
  //   const overlay = (event.target as HTMLElement).children[0];
  //   (overlay as HTMLElement).style.setProperty("--glow-x", `${x}px`);
  //   (overlay as HTMLElement).style.setProperty("--glow-y", `${y}px`);
  //   (overlay as HTMLElement).style.setProperty("--glow-opacity", "1");
  // };

  return (
    <div
      id="app-root"
      style={{ height: fullPageHeight }}
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
      </Routes>
    </div>
  );
}

export default App;
