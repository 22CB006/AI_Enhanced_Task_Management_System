import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaFolder } from 'react-icons/fa';
import { useTaskContext } from '../../contexts/TaskContext';

const ProjectItem = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const { tasks, setSelectedProject } = useTaskContext();

  const projectTasks = tasks.filter(task => task.projectId === project.id);
  
  const handleClick = () => {
    setSelectedProject(project);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className="mb-1">
      <div 
        className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
        onClick={handleClick}
      >
        <button 
          className="mr-2 text-gray-500"
          onClick={handleToggle}
        >
          {project.subProjects?.length > 0 ? (
            expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />
          ) : <span className="w-3"></span>}
        </button>
        <FaFolder className="mr-2 text-blue-500" />
        <span className="flex-grow truncate">{project.name}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {projectTasks.length}
        </span>
      </div>
      
      {expanded && project.subProjects && (
        <div className="pl-6">
          {project.subProjects.map(subProject => (
            <ProjectItem key={subProject.id} project={subProject} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectItem;