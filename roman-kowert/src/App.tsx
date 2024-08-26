import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import About from "./routes/about/about.component";
import Projects from "./routes/projects/projects.component";
import Resume from "./routes/resume/resume.component";
import axios from "axios";
import "./App.css";

function App() {
  const [contentPosition, setContentPosition] = useState("mt-72");

  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/") {
      setContentPosition("mt-72 h-[30vh]");
    } else if (location.pathname === "/about") {
      setContentPosition("mt-32 h-[75vh]");
    } else {
      setContentPosition("mt-12 h-[80vh]");
    }
  }, [location]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5000/api/users");
    console.log(response.data.users);
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div
      className={`flex justify-between ${contentPosition} transition-all duration-500`}
    >
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
