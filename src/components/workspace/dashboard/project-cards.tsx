"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const ProjectCard: React.FC = () => {
  const { projects } = useSelector((state: RootState)=> state.workspace);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {      
      setSelectedProjectId(projects[0]._id);
    }
  }, [projects]);

  const toggleProjects = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsOpen(false); 
  };

  const displayedProject = projects?.find(
    (project) => project._id === selectedProjectId
  );

  const otherProjects = projects?.filter(
    (project) => project._id !== selectedProjectId
  ) || [];


  return (
    <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow-md p-4">
      {displayedProject ? (
        <div className="flex items-center justify-between">
          <div className="flex-grow">
            <h3 className="text-sm font-medium">{displayedProject.name}</h3>
            <p className="text-xs text-gray-500">{displayedProject.description}</p>
          </div>
          <button onClick={toggleProjects} className="focus:outline-none">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </button>
        </div>
      ) : (
        <p>No project selected</p>
      )}

      {isOpen && otherProjects.length > 0 && (
        <div className="absolute left-0 w-full h-[300px] mt-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-y-auto  ">
          {otherProjects.map((project) => (
            <div
              key={project._id}
              className="flex items-center space-x-4 p-4 cursor-pointer hover:bg-gray-100 border-b"
              onClick={() => handleProjectClick(project._id)} 
            >
              <div className="flex-grow">
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-gray-500">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
