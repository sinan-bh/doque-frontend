"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";

type Project = {
  title: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Website Redesign",
    description:
      "Redesigning the company's website to improve user experience and responsiveness...",
    image: "/profile-pic1.jpg",
  },
  {
    title: "Mobile App Development",
    description:
      "Building a cross-platform mobile application to enhance user accessibility...",
    image: "/profile-pic2.jpg",
  },
  {
    title: "E-commerce Platform",
    description:
      "Developing an e-commerce platform with advanced search and recommendation systems...",
    image: "/profile-pic3.jpg",
  },
];

const ProjectCard: React.FC = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleProjects = () => {
    setIsOpen((prev) => !prev); 
  };

  const handleProjectClick = (index: number) => {
    setSelectedProjectIndex(index);
    setIsOpen(false); 
  };

  const displayedProject = projects[selectedProjectIndex];

  const otherProjects = projects.filter(
    (_, index) => index !== selectedProjectIndex
  );

  return (
    <div className="relative w-[257px]">
      <div className="w-full h-auto overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md p-2 relative z-10">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={displayedProject.image} alt="Project Icon" />
            <AvatarFallback />
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-sm">{displayedProject.title}</h3>
          </div>
          <button onClick={toggleProjects} className="focus:outline-none">
            {isOpen ? (
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
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-500">{displayedProject.description}</p>
      </div>

      {isOpen && otherProjects.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-2 p-2 z-20">
          {otherProjects.map((project, index) => (
            <div
              key={index}
              className="border-t border-gray-300 pt-4 cursor-pointer"
              onClick={() =>
                handleProjectClick(
                  projects.findIndex((p) => p.title === project.title)
                )
              }
            >
              <div className="flex items-center space-x-4">
              <Avatar>
            <AvatarImage src={project.image} alt={project.title} />
            <AvatarFallback />
          </Avatar>
                <div className="flex-grow">
                  <p className="text-sm">{project.title}</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
