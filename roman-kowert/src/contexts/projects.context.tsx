import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type Project = {
  id: number,
  project_id: number,
  title: string,
  description: string
}

export type ProjectsContextType = {
  projects: Project[] | []
  setProjects: Dispatch<SetStateAction<Project[] | []>>;
}

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  setProjects: () => [],
})

type ProjectsProviderChildren = {
  children: JSX.Element;
}

export const ProjectsProvider = ({ children }: ProjectsProviderChildren ) => {
  const [projects, setProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get("http://localhost:5000/api/get-projects")
      console.log(response);
      setProjects(response.data.projects);
    }
    getProjects();
  }, [])

  const value = { projects, setProjects };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}


