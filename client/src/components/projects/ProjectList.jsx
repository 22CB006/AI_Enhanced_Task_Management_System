import React from 'react';
import ProjectItem from './ProjectItem';
import { useTaskContext } from '../../contexts/TaskContext';

const ProjectList = () => {
  const { projects } = useTaskContext();
  
  // Filter only top-level projects (those without a parentId)
  const topLevelProjects = projects.filter(project => !project.parentId);

  return (
    <div className="mt-4">
      <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-2 px-2">Projects</h3>
      <div className="space-y-1">
        {topLevelProjects.map(project => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;