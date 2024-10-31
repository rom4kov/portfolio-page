import { Project } from "../../contexts/projects.context";

type ProjectProps = {
  project: Project,
  handleEditForm: (project: Project) => void
}

const ProjectPreview = ({ project, handleEditForm }: ProjectProps ) => {
  return (
    <div className="flex gap-3 items-start hover:bg-tokyo-4-500 p-3 rounded-lg">
      <div className="text-start">
        <div className="font-bold">{project.title}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: project.description,
          }}
        />
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
