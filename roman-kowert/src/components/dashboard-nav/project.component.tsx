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
        <div className="font-bold">{project.title}</div>
        <div className="mt-3 flex gap-3">
          <img src={getImageURL(project.img_file_path)} alt="" className="h-24"/>
          <div
            dangerouslySetInnerHTML={{
              __html: project.description,
            }}
          />
        </div>
        <div className="mt-2 flex gap-2">
          <button
            className="h-6 p-1 leading-[0.9rem] text-xs"
            onClick={() => handleEditForm(project)}
          >
            Edit
          </button>
          <button className="h-6 p-1 leading-[0.9rem] text-xs">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
