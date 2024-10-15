import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type Project = {
  id: number,
  body: string,
  page: string
}

export type ProjectsContextType = {
  texts: Project[]
  setProjects: Dispatch<SetStateAction<Project[] | []>>;
}

export const ProjectsContext = createContext<ProjectsContextType>({
  texts: [],
  setProjects: () => [],
})

type ProjectsProviderChildren = {
  children: JSX.Element;
}

export const ProjectsProvider = ({ children }: ProjectsProviderChildren ) => {
  const [texts, setProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get("http://localhost:5000/api/get-projects")
      console.log(response);
      setProjects(response.data.projects);
    }
    getProjects();
  }, [])

  const value = { texts, setProjects };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}


