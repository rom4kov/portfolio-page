import { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export type Feature = {
  id: number,
  title: string,
  img_file_path: string | undefined,
  description: string,
  project_id: number,
}

export type Project = {
  id: number,
  title: string,
  keywords: string[],
  img_file_path: string | undefined,
  url: string,
  description: string,
  features: Feature[]
  project_type: string,
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
      const response = await axios.get(`${apiUrl}/api/get-projects`)
      setProjects(response.data.projects);
    }
    getProjects();
  }, [])

  const value = { projects, setProjects };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}


