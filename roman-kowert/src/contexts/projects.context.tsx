import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

export type Feature = {
  id: number,
  title: string,
  img_file_path: string,
  description: string,
  project_id: number,
}

export type Project = {
  id: number,
  title: string,
  keywords: string[],
  img_file_path: string | undefined,
  description: string,
  features: Feature[]
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

export const ProjectsProvider = ({ children }: ProjectsProviderChildren) => {
  const [projects, setProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await axios.get("http://localhost:5000/api/get-projects")
      setProjects(response.data.projects);
    }
    getProjects();
  }, [])

  const value = { projects, setProjects };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}


