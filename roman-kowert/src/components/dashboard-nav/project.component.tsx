import { Project } from "../../contexts/projects.context";

import { getImageURL } from "../../utils/image-util";

type ProjectProps = {
  project: Project;
  handleEditForm: (project: Project) => void;
};

const ProjectPreview = ({ project, handleEditForm }: ProjectProps) => {
  console.log(project);
  return (
    <div className="flex gap-3 items-start hover:bg-tokyo-4-500 p-3 rounded-lg">
      <div className="text-start">
        <div className="mt-0 flex gap-2">
          <div className="font-bold">{project.title}</div>
          <button
            className="ms-auto h-6 p-1 leading-[0.9rem] text-xs"
            onClick={() => handleEditForm(project)}
          >
            Edit
          </button>
          <button className="me-3 h-6 p-1 leading-[0.9rem] text-xs">Delete</button>
        </div>
        <div className="mt-3 flex gap-3">
          <img src={getImageURL(project.img_file_path)} alt="" className="w-24 h-full"/>
          <div
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
